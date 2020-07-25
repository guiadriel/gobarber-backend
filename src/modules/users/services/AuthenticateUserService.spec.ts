import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'Guilherme',
      email: 'gui.adriel@gmail.com',
      password: 'guilherme1',
    });

    const response = await authenticateUser.execute({
      email: 'gui.adriel@gmail.com',
      password: 'guilherme1',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(response.user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authenticateUser.execute({
        email: 'gui.adriel@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong combination user/pass', async () => {
    await fakeUsersRepository.create({
      name: 'Guilherme',
      email: 'gui.adriel@gmail.com',
      password: 'guilherme1',
    });

    expect(
      authenticateUser.execute({
        email: 'gui.adriel@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
