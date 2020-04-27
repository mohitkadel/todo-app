const routes = require('express').Router();

const todoController = require('../controllers/todo');

routes.post('/todos', todoController.validate('createTodo'), todoController.createTodo);
routes.patch('/todos/:id', todoController.validate('modifyTodo'), todoController.modifyTodo);
routes.put('/todos/:id', todoController.validate('modifyTodo'), todoController.modifyTodo);
routes.get('/todos', todoController.getAllTodo);
routes.get('/todos/:id', todoController.getTodo);
routes.delete('/todos/:id', todoController.deleteTodo);
routes.delete('/todos', todoController.deleteTodo);

module.exports = routes;
