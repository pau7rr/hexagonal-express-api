import { User, UserEmail, UserId } from "../domain/user.entity";
import { UserRepository } from "@/domain/user.repository";

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, email: string, name: string): Promise<void> {
        const user = new User(
            new UserId(id),
            name,
            new UserEmail(email),
        );

        await this.userRepository.save(user);
    }
}