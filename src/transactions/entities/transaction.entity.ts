export class Transaction {
  id: string;

  accountId: string;

  workspaceId: string;

  categoryId?: string;

  type: string;

  amount: number;

  description?: string;

  transactionDate: Date;

  ownerId: string;

  createdAt: Date;

  updatedAt: Date;
}