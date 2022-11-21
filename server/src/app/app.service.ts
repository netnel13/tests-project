import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}

  getTodos(username: string): string[] {
    return this.usersService.findOne(username).todos;
  }

  getFavorites(username: string): string[] {
    return this.usersService.findOne(username).favorites;
  }

  addTodo(todo: string, username: string): string[] {
    const todos = [...this.usersService.findOne(username).todos, todo];
    this.usersService.update(username, {
      todos,
    });
    return todos;
  }

  addFavorite(favorite: string, username: string): string[] {
    const todos = this.usersService.findOne(username).todos;
    const newTodos = this.removeTodo(favorite, username);
    if (newTodos.length === todos.length) {
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
    const user = this.usersService.findOne(username);
    const updated = this.usersService.update(username, {
      favorites: [...user.favorites, favorite],
    });
    return updated.favorites;
  }

  removeTodo(todo: string, username: string): string[] {
    const user = this.usersService.findOne(username);
    const todos = user.todos.filter((item) => item !== todo);
    this.usersService.update(username, {
      todos,
    });
    return todos;
  }

  removeFavorite(favorite: string, username: string): string[] {
    const user = this.usersService.findOne(username);
    const favorites = user.favorites.filter((item) => item !== favorite);
    this.usersService.update(username, {
      favorites,
    });
    return favorites;
  }
}
