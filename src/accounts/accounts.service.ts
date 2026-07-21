import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(
    ownerId: string,
    createAccountDto: CreateAccountDto,
  ) {
    const workspaceDoc = await this.firebaseService.firestore
      .collection('workspaces')
      .doc(createAccountDto.workspaceId)
      .get();

    if (!workspaceDoc.exists) {
      throw new NotFoundException('Workspace not found');
    }

    const workspace = workspaceDoc.data();

    if (workspace?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the workspace owner can create accounts',
      );
    }

    const account = {
      name: createAccountDto.name,
      description: createAccountDto.description,
      type: createAccountDto.type,
      currency: createAccountDto.currency,
      openingBalance: createAccountDto.openingBalance,
      currentBalance: createAccountDto.openingBalance,
      workspaceId: createAccountDto.workspaceId,
      ownerId,
      isActive: createAccountDto.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await this.firebaseService.firestore
      .collection('accounts')
      .add(account);

    return {
      id: docRef.id,
      ...account,
    };
  }

  async findAll() {
    const snapshot = await this.firebaseService.firestore
      .collection('accounts')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findOne(id: string) {
    const doc = await this.firebaseService.firestore
      .collection('accounts')
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException('Account not found');
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async findByWorkspace(workspaceId: string) {
    const snapshot = await this.firebaseService.firestore
      .collection('accounts')
      .where('workspaceId', '==', workspaceId)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async update(
    id: string,
    ownerId: string,
    updateAccountDto: UpdateAccountDto,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('accounts')
      .doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Account not found');
    }

    const account = doc.data();

    if (account?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the account owner can update this account',
      );
    }

    const updateData: any = {
      ...updateAccountDto,
      updatedAt: new Date(),
    };

    if (
      updateAccountDto.openingBalance !== undefined &&
      updateAccountDto.openingBalance !== account?.openingBalance
    ) {
      const difference =
        updateAccountDto.openingBalance -
        account.openingBalance;

      updateData.currentBalance =
        account.currentBalance + difference;
    }

    await docRef.update(updateData);

    const updated = await docRef.get();

    return {
      id: updated.id,
      ...updated.data(),
    };
  }

  async delete(
    id: string,
    ownerId: string,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('accounts')
      .doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Account not found');
    }

    const account = doc.data();

    if (account?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the account owner can delete this account',
      );
    }

    await docRef.delete();

    return {
      message: 'Account deleted successfully',
    };
  }

  async updateBalance(
    accountId: string,
    amount: number,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('accounts')
      .doc(accountId);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Account not found');
    }

    const account = doc.data();

    const newBalance =
      (account?.currentBalance ?? 0) + amount;

    await docRef.update({
      currentBalance: newBalance,
      updatedAt: new Date(),
    });

    return {
      accountId,
      previousBalance: account?.currentBalance,
      currentBalance: newBalance,
    };
  }
}