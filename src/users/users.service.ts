import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private connection: Connection,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: User) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, user: User) {
    await this.usersRepository.update(id, user);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
