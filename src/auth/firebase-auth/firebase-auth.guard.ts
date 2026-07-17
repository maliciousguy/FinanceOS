import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('========== GUARD START ==========');

    try {
      const request = context.switchToHttp().getRequest();

      console.log('Step 1: Request received');

      const authHeader = request.headers.authorization;

      console.log('Authorization Header:', authHeader);

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid token');
      }

      const idToken = authHeader.split('Bearer ')[1];

      console.log('Step 2: Token extracted');
      console.log('Token Length:', idToken.length);
console.log(idToken);

      const decodedToken =
        await this.firebaseService.verifyToken(idToken);

      console.log('Step 3: Token verified');
      console.log(decodedToken);

      request.user = decodedToken;

      console.log('========== GUARD END ==========');

      return true;
    } catch (error) {
      console.error('========== GUARD ERROR ==========');
      console.error(error);
      console.error('===============================');

      throw error;
    }
  }
}