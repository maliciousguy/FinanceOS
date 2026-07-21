import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private firestoreDb: Firestore;

  constructor(
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert({
          projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            ?.replace(/\\n/g, '\n'),
        }),
      });

      console.log('Firebase Admin initialized');
    }

    this.firestoreDb = getFirestore();
  }

  get firestore(): Firestore {
    return this.firestoreDb;
  }

  async verifyToken(token: string) {
    return getAuth().verifyIdToken(token);
  }

  async createUser(email: string, password: string) {
    return getAuth().createUser({
      email,
      password,
    });
  }

  async getUserByEmail(email: string) {
    return getAuth().getUserByEmail(email);
  }

  async getUserByUid(uid: string) {
    return getAuth().getUser(uid);
  }

  async saveUserProfile(uid: string, data: any) {
    await this.firestoreDb.collection('users').doc(uid).set({
      ...data,
      createdAt: new Date(),
    });

    return true;
  }
}