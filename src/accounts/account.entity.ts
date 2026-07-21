export class Account {
  id: string;

  name: string;

  description?: string;

  type: string;

  currency: string;

  openingBalance: number;

  currentBalance: number;

  workspaceId: string;

  ownerId: string;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}