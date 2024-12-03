import { User, UserId } from "@/domain/user.entity";
import { UserRepository } from "@/domain/user.repository";

export class InMemoryUserRepository implements UserRepository {
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