const routes = require('express').Router();
const authorize = require('../helper/authorize');

const todoController = require('../controllers/todo');
const userController = require('../controllers/user');

routes.post('/todos', authorize(), todoController.validate('createTodo'), todoController.createTodo);
routes.patch('/todos/:id', authorize(), todoController.validate('modifyTodo'), todoController.modifyTodo);
routes.put('/todos/:id', authorize(), todoController.validate('modifyTodo'), todoController.modifyTodo);
routes.get('/todos', authorize(), todoController.getAllTodo);
routes.get('/todos/:id', authorize(), todoController.getTodo);
routes.delete('/todos/:id', authorize(), todoController.deleteTodo);
routes.delete('/todos', authorize(), todoController.deleteTodo);

routes.post('/login', userController.validate('postLogin'), userController.postLogin);
routes.post('/signup', userController.validate('postUser'), userController.signupUser);

routes.get('/users/:id', authorize(), userController.getUsers);
routes.get('/users', authorize(), userController.getUsers);

module.exports = routes;
