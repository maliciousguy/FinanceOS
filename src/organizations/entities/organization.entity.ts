export class Organization {
  id: string;
  name: string;
  description?: string;

  ownerId: string;
  memberIds: string[];

  createdAt: Date;
  updatedAt: Date;
}