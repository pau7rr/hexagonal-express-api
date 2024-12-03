import express from 'express';
import { config } from 'dotenv';
import { UserController } from './infrastructure/http/user.controller';
import { CreateUserUseCase } from './application/create-user.use-case';
import { InMemoryUserRepository } from './infrastructure/persistence/in-memory-user.repository';

// Load environment variables
config();

// Dependencies
const userRepository = new InMemoryUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

// Create Express app
const app = express();
app.use(express.json());

// Routes
app.post('/api/users', (req, res) => userController.create(req, res));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});