import { User } from '../users/entities/user.entity';

export const mockedUser: User = {
  id: 1,
  username: 'John',
  password: 'hash',
  createdAt: new Date(),
  deletedAt: null,
  errors: null,
  isActive: true,
  updatedAt: new Date(),
  cats: [],
};
