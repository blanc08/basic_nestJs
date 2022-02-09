import { User } from '../../users/entities/user.entity';

export const mockedUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'hash',
    isActive: true,
    cats: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    errors: [],
  },
];
