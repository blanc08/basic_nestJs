import { User } from '../../users/entities/user.entity';

export const mockedUser: User = {
  id: 1,
  username: 'admin',
  password: 'hash',
  isActive: true,
  cats: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  errors: [],
};
