import { User } from "@/domain/user.entity";
import { UserRepository } from "@/domain/user.repository";

export class FindAllUsersUseCase {
    constructor (private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        const users = await this.userRepository.findAll();
        return users;
    }
}