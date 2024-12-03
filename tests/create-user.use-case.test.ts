import { CreateUserUseCase } from '../src/application/create-user.use-case';
import { User, UserId } from '../src/domain/user.entity';
import { UserRepository } from '../src/domain/user.repository';

class MockUserRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(id: UserId): Promise<User | null> {
    return this.users.find(user => user.getId().getValue() === id.getValue()) || null;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a user successfully', async () => {
    const userId = '1';
    const userEmail = 'test@example.com';
    const userName = 'Test User';

    await createUserUseCase.execute(userId, userEmail, userName);

    const createdUser = await userRepository.findById(new UserId(userId));
    expect(createdUser).not.toBeNull();
    expect(createdUser?.getEmail().getValue()).toBe(userEmail);
    expect(createdUser?.getName()).toBe(userName);
  });

  it('should throw an error if the email is invalid', async () => {
    const userId = '2';
    const userEmail = 'invalid-email';
    const userName = 'Test User';

    await expect(createUserUseCase.execute(userId, userEmail, userName)).rejects.toThrow('This email is not valid!');
  });
});