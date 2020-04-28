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
					check('title').exists()
				]
			}
		case 'modifyTodo':
			{
				return [
					// check('todo').exists(),
					check('completed').custom(value => {
						if (value && (value != true && value != false)) {
							return Promise.reject('Invalid completed status')
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

	// Only logged in user's todo to show
	if(req.id) {
		query.created_by = req.id;
	}

	Todo.find(query).then((todos) => {
			res.status(200).send(response(todos));
		})
		.catch((error) => {
			console.log(error)
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
	Todo.findById(req.params.id).then((todo) => {
			res.status(200).send(response(todo));
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
			todo.completed = req.body.completed;
			todo.title = req.body.title || todo.title;
			todo.order = req.body.order || todo.order;
			todo.updated_by = req.id // Updated by user id
			todo.save();

			res.status(200).send(response(todo));
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
	todo.created_by = req.id // Created by user id
	
	todo.save(todo).then((todo) => {
			res.status(201).send(response(todo));
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
	if (!req.params.id) {
		// Delete all records
		Todo.deleteMany({}).then((todo) => {
				res.status(200).send([]);
			})
			.catch((error) => {
				console.log(error)
				res.status(400).send({ message: "Something went wrong" });
			})
	} else {
		Todo.findByIdAndRemove(req.params.id).then((todo) => {
				if (!todo) {
					return res.status(404).send({ message: "Todo not found with id " + req.body.id });
				}

				res.status(200).send(todo);
			})
			.catch((error) => {
				console.log(error)
				res.status(404).send({ message: "Todo not found" });
			})
	}
};

function response(data) {
	var response = data;
	if (Array.isArray(response)) {
		response = JSON.parse(JSON.stringify(data))

		response.map((todo) => {
			todo.url = process.env.API_URL + "/todos/" + todo._id
			return todo;
		})
	} else {
		response = data.toJSON()
		response.url = process.env.API_URL + "/todos/" + response._id
	}
	return response;
}

module.exports = {
	createTodo: createTodo,
	modifyTodo: modifyTodo,
	getTodo: getTodo,
	getAllTodo: getAllTodo,
	deleteTodo: deleteTodo,
	validate: validate
}
