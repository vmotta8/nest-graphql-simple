import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUserDTO } from './dto/create-user.input';
import { IUpdateUserDTO } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async update(id: string, data: IUpdateUserDTO): Promise<User> {
    const user = await this.findOneById(id);
    await this.userRepository.update(user, { ...data });

    const userUpdated = this.userRepository.create({ ...user, ...data });

    return userUpdated;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);
    return userSaved;
  }

  async delete(id: string): Promise<boolean> {
    const user = await this.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const deleted = await this.userRepository.delete(id);
    console.log(deleted);
    console.log(user);
    return true;
  }
}
