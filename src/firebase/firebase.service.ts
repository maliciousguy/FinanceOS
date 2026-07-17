import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('../../firebase-service-account.json');

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount),
      });

      console.log('Firebase Admin initialized');
    }
  }

  createUser(email: string, password: string) {
    return getAuth().createUser({
      email,
      password,
    });
  }

  async saveUserProfile(uid: string, email: string) {
    await getFirestore()
      .collection('users')
      .doc(uid)
      .set({
        email,
        createdAt: new Date(),
        role: 'user',
      });
  }

  async verifyToken(idToken: string) {
    return getAuth().verifyIdToken(idToken);
  }
}