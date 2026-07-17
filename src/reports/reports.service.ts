import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class ReportsService {
  async getMonthlySummary(
    uid: string,
    month: string,
  ) {
    const db = getFirestore();

    const incomeSnapshot = await db
      .collection('users')
      .doc(uid)
      .collection('income')
      .get();

    const expenseSnapshot = await db
      .collection('users')
      .doc(uid)
      .collection('expense')
      .get();

    let totalIncome = 0;
    let totalExpense = 0;

    incomeSnapshot.forEach((doc) => {
      const income = doc.data();

      if (income.date?.startsWith(month)) {
        totalIncome += Number(income.amount);
      }
    });

    expenseSnapshot.forEach((doc) => {
      const expense = doc.data();

      if (expense.date?.startsWith(month)) {
        totalExpense += Number(expense.amount);
      }
    });

    return {
      month,
      totalIncome,
      totalExpense,
      netSavings: totalIncome - totalExpense,
    };
  }
}