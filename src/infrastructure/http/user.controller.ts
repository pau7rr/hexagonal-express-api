import { CreateUserUseCase } from '@/application/create-user.use-case';
import { FindUserUseCase } from '@/application/find-user.use-case';

import { UserId } from '../../domain/user.entity';
import { Request, Response } from 'express';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private findUserUseCase: FindUserUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { id, email, name } = req.body;
      await this.createUserUseCase.execute(id, email, name);
      res.status(201).json({ message: 'User created successfully!' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = new UserId(req.params.id);
   
      const result = await this.findUserUseCase.execute(userId);

      if (!result){
        res.status(404).json({ error: 'User not found!' });
        return;
      } 

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
    
  }
}