import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async register(email: string, password: string) {
    const user = await this.firebaseService.createUser(email, password);

    await this.firebaseService.saveUserProfile(
  user.uid,
  user.email!,
);

    return {
      message: 'User created successfully',
      uid: user.uid,
      email: user.email,
    };
  }
}