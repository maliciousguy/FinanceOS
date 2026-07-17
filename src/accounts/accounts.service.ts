import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';


@Injectable()
export class AccountsService {


  async createAccount(
    uid: string,
    data: any,
  ) {

    const db = getFirestore();


    const docRef = await db
      .collection('users')
      .doc(uid)
      .collection('accounts')
      .add({

        ...data,

        createdAt: new Date(),

      });



    return {

      message: 'Account created successfully',

      accountId: docRef.id,

    };

  }





  async getAccounts(
    uid: string,
  ) {

    const db = getFirestore();


    const snapshot = await db
      .collection('users')
      .doc(uid)
      .collection('accounts')
      .get();



    return snapshot.docs.map((doc) => ({

      id: doc.id,

      ...doc.data(),

    }));

  }





  async getAccountById(
    uid: string,
    accountId: string,
  ) {

    const db = getFirestore();


    const doc = await db
      .collection('users')
      .doc(uid)
      .collection('accounts')
      .doc(accountId)
      .get();



    if (!doc.exists) {

      return {

        message: 'Account not found',

      };

    }



    return {

      id: doc.id,

      ...doc.data(),

    };

  }





  async updateAccount(
    uid: string,
    accountId: string,
    data: any,
  ) {

    const db = getFirestore();


    const accountRef = db
      .collection('users')
      .doc(uid)
      .collection('accounts')
      .doc(accountId);



    const account = await accountRef.get();



    if (!account.exists) {

      return {

        message: 'Account not found',

      };

    }



    await accountRef.update({

      ...data,

      updatedAt: new Date(),

    });



    return {

      message: 'Account updated successfully',

      accountId,

    };

  }





  async deleteAccount(
    uid: string,
    accountId: string,
  ) {

    const db = getFirestore();


    const accountRef = db
      .collection('users')
      .doc(uid)
      .collection('accounts')
      .doc(accountId);



    const account = await accountRef.get();



    if (!account.exists) {

      return {

        message: 'Account not found',

      };

    }



    await accountRef.delete();



    return {

      message: 'Account deleted successfully',

      accountId,

    };

  }

}