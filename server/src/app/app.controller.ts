import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('todos')
  getTodos(): string[] {
    return this.appService.getTodos();
  }

  @Get('favorites')
  getFavorites(): string[] {
    return this.appService.getFavorites();
  }

  @Post('add/todo/:todo')
  addTodo(@Param('todo') todo: string): string[] {
    return this.appService.addTodo(todo);
  }

  @Post('add/favorite/:favorite')
  addFavorite(@Param('favorite') favorite: string): string[] {
    return this.appService.addFavorite(favorite);
  }

  @Delete('remove/todo/:todo')
  removeTodo(@Param('todo') todo: string) {
    return this.appService.removeTodo(todo);
  }

  @Delete('remove/favorite/:favorite')
  removeFavorite(@Param('favorite') favorite: string) {
    return this.appService.removeFavorite(favorite);
  }
}
