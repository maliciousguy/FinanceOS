import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class UsersService {
  async getProfile(uid: string) {
    try {
      console.log('=================================');
      console.log('Looking up user:', uid);

      const doc = await getFirestore()
        .collection('users')
        .doc(uid)
        .get();

      console.log('Document exists:', doc.exists);

      if (!doc.exists) {
        console.log('User document not found.');
        return {
          message: 'User not found',
        };
      }

      const userData = {
        uid,
        email: doc.get('email'),
        role: doc.get('role'),
      };

      console.log('User data:', userData);
      console.log('=================================');

      return userData;
    } catch (error) {
      console.error('=================================');
      console.error('Firestore Error:', error);
      console.error('=================================');
      throw error;
    }
  }
}