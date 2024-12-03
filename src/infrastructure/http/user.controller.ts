import { CreateUserUseCase } from '@/application/create-user.use-case';
import { Request, Response } from 'express';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { id, email, name } = req.body;
      await this.createUserUseCase.execute(id, email, name);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}