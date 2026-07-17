import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {
  async createIncome(
    uid: string,
    createIncomeDto: CreateIncomeDto,
  ) {
    const docRef = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('income')
      .add({
        ...createIncomeDto,
        createdAt: new Date(),
      });

    return {
      message: 'Income created successfully',
      incomeId: docRef.id,
    };
  }

  async getAllIncome(uid: string) {
    const snapshot = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('income')
      .get();

    return snapshot.docs.map((doc) => ({
      incomeId: doc.id,
      ...doc.data(),
    }));
  }

  async getIncomeById(
    uid: string,
    id: string,
  ) {
    const doc = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('income')
      .doc(id)
      .get();

    if (!doc.exists) {
      return {
        message: 'Income not found',
      };
    }

    return {
      incomeId: doc.id,
      ...doc.data(),
    };
  }

  async updateIncome(
    uid: string,
    id: string,
    updateIncomeDto: UpdateIncomeDto,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('income')
      .doc(id)
      .update(updateIncomeDto);

    return {
      message: 'Income updated successfully',
      incomeId: id,
    };
  }

  async deleteIncome(
    uid: string,
    id: string,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('income')
      .doc(id)
      .delete();

    return {
      message: 'Income deleted successfully',
      incomeId: id,
    };
  }
}