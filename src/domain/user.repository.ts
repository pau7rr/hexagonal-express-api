import { User, UserId } from "./user.entity";

export interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: UserId): Promise<User | null>;
    findAll(): Promise<User[]>;
}