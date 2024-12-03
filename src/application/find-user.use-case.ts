import { User, UserId } from "@/domain/user.entity";
import { UserRepository } from "@/domain/user.repository";

export class FindUserUseCase {
    constructor (private userRepository: UserRepository) {}

    async execute(id: UserId): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        return user;
    }
}