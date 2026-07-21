import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(
    ownerId: string,
    createOrganizationDto: CreateOrganizationDto,
  ) {
    const organization = {
      name: createOrganizationDto.name,
      description: createOrganizationDto.description,
      ownerId,
      memberIds: [ownerId],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await this.firebaseService.firestore
      .collection('organizations')
      .add(organization);

    return {
      id: docRef.id,
      ...organization,
    };
  }

  async findAll() {
    const snapshot = await this.firebaseService.firestore
      .collection('organizations')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findOne(id: string) {
    const doc = await this.firebaseService.firestore
      .collection('organizations')
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException('Organization not found');
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async update(
    id: string,
    ownerId: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('organizations')
      .doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Organization not found');
    }

    const organization = doc.data();

    if (organization?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the organization owner can update it',
      );
    }

    await docRef.update({
      ...updateOrganizationDto,
      updatedAt: new Date(),
    });

    const updated = await docRef.get();

    return {
      id: updated.id,
      ...updated.data(),
    };
  }

  async addMember(
    organizationId: string,
    ownerId: string,
    addMemberDto: AddMemberDto,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('organizations')
      .doc(organizationId);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Organization not found');
    }

    const organization = doc.data();

    if (organization?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the owner can add members',
      );
    }

    const user = await this.firebaseService.getUserByEmail(
      addMemberDto.email,
    );

    const memberIds = organization.memberIds || [];

    if (!memberIds.includes(user.uid)) {
      memberIds.push(user.uid);
    }

    await docRef.update({
      memberIds,
      updatedAt: new Date(),
    });

    return {
      message: 'Member added successfully',
    };
  }

  async getMembers(organizationId: string) {
    const doc = await this.firebaseService.firestore
      .collection('organizations')
      .doc(organizationId)
      .get();

    if (!doc.exists) {
      throw new NotFoundException('Organization not found');
    }

    const organization = doc.data();

    const members = await Promise.all(
      (organization?.memberIds || []).map(async (uid: string) => {
        const user = await this.firebaseService.getUserByUid(uid);

        return {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
      }),
    );

    return members;
  }

  async removeMember(
    organizationId: string,
    ownerId: string,
    removeMemberDto: RemoveMemberDto,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('organizations')
      .doc(organizationId);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Organization not found');
    }

    const organization = doc.data();

    if (organization?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the owner can remove members',
      );
    }

    const memberIds = (organization.memberIds || []).filter(
      (id: string) => id !== removeMemberDto.userId,
    );

    await docRef.update({
      memberIds,
      updatedAt: new Date(),
    });

    return {
      message: 'Member removed successfully',
    };
  }

  async remove(
    id: string,
    ownerId: string,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('organizations')
      .doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Organization not found');
    }

    const organization = doc.data();

    if (organization?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the organization owner can delete it',
      );
    }

    await docRef.delete();

    return {
      message: 'Organization deleted successfully',
    };
  }
}