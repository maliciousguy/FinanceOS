import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class DashboardService {
  async getDashboard(uid: string) {
    const db = getFirestore();

    // Accounts
    const accountsSnapshot = await db
      .collection('users')
      .doc(uid)
      .collection('accounts')
      .get();

    // Income
    const incomeSnapshot = await db
      .collection('users')
      .doc(uid)
      .collection('income')
      .get();

    // Expense
    const expenseSnapshot = await db
      .collection('users')
      .doc(uid)
      .collection('expense')
      .get();

    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpense = 0;

    accountsSnapshot.forEach((doc) => {
      totalBalance += Number(doc.data().balance || 0);
    });

    incomeSnapshot.forEach((doc) => {
      totalIncome += Number(doc.data().amount || 0);
    });

    expenseSnapshot.forEach((doc) => {
      totalExpense += Number(doc.data().amount || 0);
    });

    return {
      totalAccounts: accountsSnapshot.size,
      totalBalance,
      totalIncome,
      totalExpense,
      netSavings: totalIncome - totalExpense,
    };
  }
}