import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
} from 'date-fns';

import { FirebaseService } from '../firebase/firebase.service';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';

@Injectable()
export class RecurringTransactionsService {
  private readonly logger = new Logger(
    RecurringTransactionsService.name,
  );

  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  private get db() {
    return this.firebaseService.firestore;
  }

  async createRecurringTransaction(
    uid: string,
    dto: CreateRecurringTransactionDto,
  ) {
    const doc = await this.db
      .collection('users')
      .doc(uid)
      .collection('recurring-transactions')
      .add({
        ...dto,
        createdAt: new Date(),
      });

    return {
      message: 'Recurring transaction created successfully',
      recurringTransactionId: doc.id,
    };
  }

  async getAllRecurringTransactions(uid: string) {
    const snapshot = await this.db
      .collection('users')
      .doc(uid)
      .collection('recurring-transactions')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => ({
      recurringTransactionId: doc.id,
      ...doc.data(),
    }));
  }

  async getRecurringTransactionById(
    uid: string,
    recurringTransactionId: string,
  ) {
    const doc = await this.db
      .collection('users')
      .doc(uid)
      .collection('recurring-transactions')
      .doc(recurringTransactionId)
      .get();

    if (!doc.exists) {
      throw new NotFoundException(
        'Recurring transaction not found',
      );
    }

    return {
      recurringTransactionId: doc.id,
      ...doc.data(),
    };
  }

  async updateRecurringTransaction(
    uid: string,
    recurringTransactionId: string,
    dto: UpdateRecurringTransactionDto,
  ) {
    const ref = this.db
      .collection('users')
      .doc(uid)
      .collection('recurring-transactions')
      .doc(recurringTransactionId);

    const doc = await ref.get();

    if (!doc.exists) {
      throw new NotFoundException(
        'Recurring transaction not found',
      );
    }

    await ref.update(dto);

    return {
      message: 'Recurring transaction updated successfully',
      recurringTransactionId,
    };
  }

  async deleteRecurringTransaction(
    uid: string,
    recurringTransactionId: string,
  ) {
    const ref = this.db
      .collection('users')
      .doc(uid)
      .collection('recurring-transactions')
      .doc(recurringTransactionId);

    const doc = await ref.get();

    if (!doc.exists) {
      throw new NotFoundException(
        'Recurring transaction not found',
      );
    }

    await ref.delete();

    return {
      message: 'Recurring transaction deleted successfully',
      recurringTransactionId,
    };
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async processRecurringTransactions() {
    this.logger.log(
      'Running recurring transaction scheduler...',
    );

    const usersSnapshot = await this.db
      .collection('users')
      .get();

    for (const userDoc of usersSnapshot.docs) {
      const uid = userDoc.id;

      const recurringSnapshot = await this.db
        .collection('users')
        .doc(uid)
        .collection('recurring-transactions')
        .get();

      for (const recurringDoc of recurringSnapshot.docs) {
        const recurring = recurringDoc.data();

        if (!recurring.nextDate) {
          continue;
        }

        const nextDate = new Date(recurring.nextDate);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        nextDate.setHours(0, 0, 0, 0);

        if (nextDate > today) {
          continue;
        }

        await this.db
          .collection('users')
          .doc(uid)
          .collection('transactions')
          .add({
            title: recurring.title,
            amount: recurring.amount,
            type: recurring.type,
            category: recurring.category ?? null,
            accountId: recurring.accountId ?? null,
            notes: 'Automatically generated',
            createdAt: new Date(),
            recurringTransactionId: recurringDoc.id,
          });

        let updatedNextDate: Date;
                switch (
          String(recurring.frequency).toLowerCase()
        ) {
          case 'daily':
            updatedNextDate = addDays(nextDate, 1);
            break;

          case 'weekly':
            updatedNextDate = addWeeks(nextDate, 1);
            break;

          case 'monthly':
            updatedNextDate = addMonths(nextDate, 1);
            break;

          case 'yearly':
            updatedNextDate = addYears(nextDate, 1);
            break;

          default:
            this.logger.warn(
              `Unknown frequency "${recurring.frequency}" for recurring transaction ${recurringDoc.id}`,
            );
            continue;
        }

        await recurringDoc.ref.update({
          nextDate: updatedNextDate
            .toISOString()
            .split('T')[0],
        });

        this.logger.log(
          `Recurring transaction ${recurringDoc.id} processed successfully.`,
        );
      }
    }

    this.logger.log(
      'Recurring transaction scheduler completed.',
    );
  }
}