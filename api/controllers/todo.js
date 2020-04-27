const Todo = require('../models/todo.model');
const { check, body, validationResult } = require('express-validator')
const _ = require('lodash');
const path = require('path');

/**
 * Validations
 * @param  {[type]} method [description]
 * @return {[type]}        [description]
 */
let validate = function (method) {
	switch (method) {
		case 'createTodo':
			{
				return [
					check('todo').exists()
				]
			}
		case 'modifyTodo':
			{
				return [
					// check('todo').exists(),
					check('status').exists().custom(value => {
						if (value && (value != "Active" && value != "Completed")) {
							return Promise.reject('Invalid status')
						}
						return true;
					}),
				]
			}
	}
}

/**
 * Get all Todos
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
let getAllTodo = function (req, res) {
	let query = {};

	Todo.find(query).then((Todos) => {
			res.status(200).send(Todos);
		})
		.catch((error) => {
			res.status(400).send(error);
		})
};

/**
 * Get Todo by Id
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
let getTodo = function (req, res) {
	Todo.findById(req.params.id).then((Todo) => {
			res.status(200).send(Todo);
		})
		.catch((error) => {
			res.status(404).send(error);
		});
};

/**
 * Update Todo
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
let modifyTodo = function (req, res) {
	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	Todo.findById(req.params.id).then((todo) => {
			todo.status = req.body.status;
			todo.save();

			res.status(200).send(todo);
		})
		.catch((error) => {
			console.log(error)
			res.status(404).send({ message: "Todo not found" });
		})
};

/**
 * Create Todo 
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
let createTodo = function (req, res) {
	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	let todo = new Todo(req.body);

	todo.save(todo).then(() => {
			res.status(201).send(todo);
		})
		.catch((error) => {
			console.log(error)
			res.status(400).send({ message: "Something went wrong" });
		})
};

/**
 * Delete Todo
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
let deleteTodo = function (req, res) {

	Todo.findByIdAndRemove(req.params.id).then((todo) => {
			if (!todo) {
				return res.status(404).send({ message: "Todo not found with id " + req.params.id });
			}

			res.status(204).send({ message: "Todo deleted successfully!" });
		})
		.catch((error) => {
			console.log(error)
			res.status(404).send({ message: "Todo not found" });
		})
};

module.exports = {
	createTodo: createTodo,
	modifyTodo: modifyTodo,
	getTodo: getTodo,
	getAllTodo: getAllTodo,
	deleteTodo: deleteTodo,
	validate: validate
}
