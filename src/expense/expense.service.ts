import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  async createExpense(
    uid: string,
    createExpenseDto: CreateExpenseDto,
  ) {
    const docRef = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('expense')
      .add({
        ...createExpenseDto,
        createdAt: new Date(),
      });

    return {
      message: 'Expense created successfully',
      expenseId: docRef.id,
    };
  }

  async getAllExpense(uid: string) {
    const snapshot = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('expense')
      .get();

    return snapshot.docs.map((doc) => ({
      expenseId: doc.id,
      ...doc.data(),
    }));
  }

  async getExpenseById(
    uid: string,
    id: string,
  ) {
    const doc = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('expense')
      .doc(id)
      .get();

    if (!doc.exists) {
      return {
        message: 'Expense not found',
      };
    }

    return {
      expenseId: doc.id,
      ...doc.data(),
    };
  }

  async updateExpense(
    uid: string,
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('expense')
      .doc(id)
      .update(updateExpenseDto);

    return {
      message: 'Expense updated successfully',
      expenseId: id,
    };
  }

  async deleteExpense(
    uid: string,
    id: string,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('expense')
      .doc(id)
      .delete();

    return {
      message: 'Expense deleted successfully',
      expenseId: id,
    };
  }
}