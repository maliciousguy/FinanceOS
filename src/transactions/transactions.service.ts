import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class TransactionsService {


  async createTransaction(
    uid: string,
    data: any,
  ) {
    const db = getFirestore();

    const docRef = await db
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .add({
        ...data,
        createdAt: new Date(),
      });

    return {
      message: 'Transaction created successfully',
      transactionId: docRef.id,
    };
  }



  async getTransactions(
    uid: string,
  ) {
    const db = getFirestore();

    const snapshot = await db
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }



  async getTransactionById(
    uid: string,
    transactionId: string,
  ) {

    const db = getFirestore();

    const doc = await db
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .doc(transactionId)
      .get();


    if (!doc.exists) {
      return {
        message: 'Transaction not found',
      };
    }


    return {
      id: doc.id,
      ...doc.data(),
    };
  }



  async updateTransaction(
    uid: string,
    transactionId: string,
    data: any,
  ) {

    const db = getFirestore();

    const transactionRef = db
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .doc(transactionId);


    const transaction = await transactionRef.get();


    if (!transaction.exists) {
      return {
        message: 'Transaction not found',
      };
    }


    await transactionRef.update({
      ...data,
      updatedAt: new Date(),
    });


    return {
      message: 'Transaction updated successfully',
      transactionId,
    };
  }



  async deleteTransaction(
    uid: string,
    transactionId: string,
  ) {

    const db = getFirestore();

    const transactionRef = db
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .doc(transactionId);


    const transaction = await transactionRef.get();


    if (!transaction.exists) {
      return {
        message: 'Transaction not found',
      };
    }


    await transactionRef.delete();


    return {
      message: 'Transaction deleted successfully',
      transactionId,
    };
  }

}