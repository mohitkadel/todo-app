const routes = require('express').Router();

const todoController = require('../controllers/todo');

routes.post('/todos', todoController.validate('createTodo'), todoController.createTodo);
routes.put('/todos/:id', todoController.validate('modifyTodo'), todoController.modifyTodo);
routes.get('/todos', todoController.getAllTodo);
routes.delete('/todos/:id', todoController.deleteTodo);

module.exports = routes;
