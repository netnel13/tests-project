import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AppService } from './app.service';

describe('RoleService', () => {
  let service: AppService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService, UsersService],
    }).compile();

    service = module.get<AppService>(AppService);
    userService = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  describe('getTodos', () => {
    it('should return an empty list of todos', () => {
      jest.spyOn(userService, 'findOne').mockReturnValueOnce({
        username: 'test',
        password: 'test',
        todos: [],
        favorites: [],
      });

      expect(service.getTodos('test')).toEqual([]);
    });
  });

  describe('getFavorites', () => {
    it('should return an empty list of favorites', () => {
      jest.spyOn(userService, 'findOne').mockReturnValueOnce({
        username: 'test',
        password: 'test',
        todos: [],
        favorites: [],
      });

      expect(service.getFavorites('test')).toEqual([]);
    });
  });

  describe('addTodo', () => {
    it('should add a new Todo', () => {
      jest.spyOn(userService, 'findOne').mockReturnValueOnce({
        username: 'test',
        password: 'test',
        todos: [],
        favorites: [],
      });
      jest.spyOn(userService, 'update').mockReturnValueOnce({
        username: 'test',
        password: 'test',
        todos: ['new'],
        favorites: [],
      });

      expect(service.addTodo('new', 'test')).toContain('new');
    });
  });

  describe('addFavorite', () => {
    it('should add a new Favorite, and remove it from todos', () => {
      jest.spyOn(service, 'removeTodo').mockReturnValueOnce([]);
      jest.spyOn(userService, 'findOne').mockReturnValue({
        username: 'test',
        password: 'test',
        todos: ['new'],
        favorites: [],
      });
      jest.spyOn(userService, 'update').mockReturnValue({
        username: 'test',
        password: 'test',
        todos: [],
        favorites: ['new'],
      });

      expect(service.addFavorite('new', 'test')).toContain('new');
    });

    it('should throw error when sending non existing todo', () => {
      jest.spyOn(userService, 'findOne').mockReturnValue({
        username: 'test',
        password: 'test',
        todos: ['new1'],
        favorites: [],
      });
      jest.spyOn(service, 'removeTodo').mockReturnValueOnce(['new1']);

      expect(() => service.addFavorite('new', 'test')).toThrow(
        'Http Exception',
      );
    });

    it('should fail', () => {
      jest.spyOn(userService, 'findOne').mockReturnValue({
        username: 'test',
        password: 'test',
        todos: ['new1'],
        favorites: [],
      });
      jest.spyOn(service, 'removeTodo').mockImplementationOnce(() => {
        throw new Error('fail');
      });

      expect(() => service.addFavorite('new', 'test')).toThrow('fail');
    });
  });

  describe('removeTodo', () => {
    it('should remove todo', () => {
      jest.spyOn(userService, 'findOne').mockReturnValue({
        username: 'test',
        password: 'test',
        todos: ['new'],
        favorites: [],
      });

      expect(service.getTodos('test')).toContain('new');
      expect(service.removeTodo('new', 'test')).toEqual([]);
    });
  });

  describe('removeFavorite', () => {
    it('should remove favorite', () => {
      jest.spyOn(userService, 'findOne').mockReturnValue({
        username: 'test',
        password: 'test',
        todos: [],
        favorites: ['new'],
      });
      jest.spyOn(userService, 'update').mockReturnValueOnce({
        username: 'test',
        password: 'test',
        todos: [],
        favorites: [],
      });

      expect(service.removeFavorite('new', 'test')).toEqual([]);
    });
  });
});
