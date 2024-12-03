import express from 'express';
import { config } from 'dotenv';
import { UserController } from './infrastructure/http/user.controller';
import { CreateUserUseCase } from './application/create-user.use-case';
import { InMemoryUserRepository } from './infrastructure/persistence/in-memory-user.repository';
import { FindUserUseCase } from './application/find-user.use-case';
import { FindAllUsersUseCase } from './application/find-all-users.use-case';

// Load environment variables
config();

// Dependencies
const userRepository = new InMemoryUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);
const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
const userController = new UserController(createUserUseCase, findUserUseCase, findAllUsersUseCase);

// Create Express app
const app = express();
app.use(express.json());

// Routes
app.post('/api/users', (req, res) => userController.create(req, res));
app.get('/api/users/:id', (req, res) => userController.findUser(req, res));
app.get('/api/users', (req, res) => userController.findAllUsers(req, res));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});