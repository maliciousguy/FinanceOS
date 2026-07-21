import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(
    ownerId: string,
    createWorkspaceDto: CreateWorkspaceDto,
  ) {
    const organizationDoc = await this.firebaseService.firestore
      .collection('organizations')
      .doc(createWorkspaceDto.organizationId)
      .get();

    if (!organizationDoc.exists) {
      throw new NotFoundException('Organization not found');
    }

    const organization = organizationDoc.data();

    if (organization?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the organization owner can create workspaces',
      );
    }

    const workspace = {
      name: createWorkspaceDto.name,
      description: createWorkspaceDto.description,
      organizationId: createWorkspaceDto.organizationId,
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await this.firebaseService.firestore
      .collection('workspaces')
      .add(workspace);

    return {
      id: docRef.id,
      ...workspace,
    };
  }

  async findAll() {
    const snapshot = await this.firebaseService.firestore
      .collection('workspaces')
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async findOne(id: string) {
    const doc = await this.firebaseService.firestore
      .collection('workspaces')
      .doc(id)
      .get();

    if (!doc.exists) {
      throw new NotFoundException('Workspace not found');
    }

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async update(
    id: string,
    ownerId: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('workspaces')
      .doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Workspace not found');
    }

    const workspace = doc.data();

    if (workspace?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the workspace owner can update this workspace',
      );
    }

    await docRef.update({
      ...updateWorkspaceDto,
      updatedAt: new Date(),
    });

    const updated = await docRef.get();

    return {
      id: updated.id,
      ...updated.data(),
    };
  }

  async remove(
    id: string,
    ownerId: string,
  ) {
    const docRef = this.firebaseService.firestore
      .collection('workspaces')
      .doc(id);

    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException('Workspace not found');
    }

    const workspace = doc.data();

    if (workspace?.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the workspace owner can delete this workspace',
      );
    }

    await docRef.delete();

    return {
      message: 'Workspace deleted successfully',
    };
  }
}