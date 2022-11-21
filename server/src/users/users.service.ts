import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { users } from '../data';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      todos: [],
      favorites: [],
    };
    users.push(user);
    return user;
  }

  findAll() {
    return users;
  }

  findOne(username: string) {
    return users.find((user) => user.username === username);
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    let updatedUser: undefined | User;
    users.map((user) => {
      if (user.username === username) {
        user = { ...user, ...updateUserDto };
        updatedUser = { ...user };
        return user;
      }
      return user;
    });
    return updatedUser;
  }

  remove(username: string) {
    const user = this.findOne(username);
    if (user) {
      users.splice(
        0,
        users.length,
        ...users.filter((user) => user.username !== username),
      );
      return user;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'todo not found',
      },
      HttpStatus.NOT_FOUND,
      {
        cause: new Error('todo not found'),
      },
    );
  }

  login({ username, password }: CreateUserDto) {
    return users.find(
      (user) => user.username === username && user.password === password,
    );
  }
}
