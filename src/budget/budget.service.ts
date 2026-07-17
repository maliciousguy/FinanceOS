import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
  async createBudget(
    uid: string,
    createBudgetDto: CreateBudgetDto,
  ) {
    const docRef = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('budgets')
      .add({
        ...createBudgetDto,
        createdAt: new Date(),
      });

    return {
      message: 'Budget created successfully',
      budgetId: docRef.id,
    };
  }

  async getAllBudgets(uid: string) {
    const snapshot = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('budgets')
      .get();

    return snapshot.docs.map((doc) => ({
      budgetId: doc.id,
      ...doc.data(),
    }));
  }

  async getBudgetById(
    uid: string,
    id: string,
  ) {
    const doc = await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('budgets')
      .doc(id)
      .get();

    return {
      budgetId: doc.id,
      ...doc.data(),
    };
  }

  async updateBudget(
    uid: string,
    id: string,
    updateBudgetDto: UpdateBudgetDto,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('budgets')
      .doc(id)
      .update(updateBudgetDto);

    return {
      message: 'Budget updated successfully',
      budgetId: id,
    };
  }

  async deleteBudget(
    uid: string,
    id: string,
  ) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .collection('budgets')
      .doc(id)
      .delete();

    return {
      message: 'Budget deleted successfully',
      budgetId: id,
    };
  }
}