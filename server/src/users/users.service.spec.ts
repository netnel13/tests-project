import { Test, TestingModule } from '@nestjs/testing';
import { users } from '../data';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);

    users.splice(0, users.length);
    jest.clearAllMocks();
  });

  it('create', () => {
    service.create({
      username: 'test',
      password: 'test',
    });
    expect(users.length).toEqual(1);
  });

  it('findAll', () => {
    expect(service.findAll()).toEqual([]);
  });

  it('findOne', () => {
    service.create({
      username: 'test',
      password: 'test',
    });
    expect(service.findOne('test')).toMatchObject<User>({
      username: 'test',
      password: 'test',
      todos: [],
      favorites: [],
    });
  });

  it('update', () => {
    service.create({
      username: 'test',
      password: 'test',
    });
    expect(
      service.update('test', {
        todos: ['1'],
      }),
    ).toMatchObject({
      favorites: [],
      password: 'test',
      todos: ['1'],
      username: 'test',
    });
  });

  it('remove', () => {
    service.create({
      username: 'test',
      password: 'test',
    });
    jest.spyOn(service, 'findOne').mockReturnValue({
      username: 'test',
      password: 'test',
      favorites: [],
      todos: [],
    });
    expect(service.remove('test')).toMatchObject({
      username: 'test',
      password: 'test',
      favorites: [],
      todos: [],
    });
    expect(service.findAll()).toEqual([]);
  });

  it('login', () => {
    service.create({
      username: 'test',
      password: 'test',
    });
    expect(service.login({ username: 'test', password: 'test' })).toMatchObject(
      {
        username: 'test',
        password: 'test',
        favorites: [],
        todos: [],
      },
    );
  });
});
