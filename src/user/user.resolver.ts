import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { ICreateUserDTO } from './dto/create-user.input';
import { IUpdateUserDTO } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async findAll(): Promise<User[]> {
    const users = this.userService.findAll();

    return users;
  }

  @Query(() => User)
  async findOneById(@Args('id') id: string): Promise<User> {
    const user = this.userService.findOneById(id);
    return user;
  }

  @Query(() => User)
  async findOneByEmail(@Args('email') email: string): Promise<User> {
    const user = this.userService.findOneByEmail(email);
    return user;
  }

  @Mutation(() => User)
  async update(
    @Args('id') id: string,
    @Args('data') data: IUpdateUserDTO,
  ): Promise<User> {
    const user = this.userService.update(id, data);
    return user;
  }

  @Mutation(() => User)
  async create(@Args('data') data: ICreateUserDTO): Promise<User> {
    const user = await this.userService.create(data);
    return user;
  }

  @Mutation(() => Boolean)
  async delete(@Args('id') id: string): Promise<boolean> {
    const deleted = this.userService.delete(id);
    return deleted;
  }
}
