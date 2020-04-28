const User = require('../models/user.model');
const { check, body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

/**
 * Validations
 * @param  {[type]} method [description]
 * @return {[type]}        [description]
 */
let validate = function(method) {
	switch (method) {
		case 'postUser':
			{
				return [
					check('name').exists(),
					check('status').custom(value => {
						if (value && (value != true && value != false)) {
							return Promise.reject('Invalid status')
						}
						return true;
					}),
					check('email').exists().isEmail().custom(value => {
						return User.findOne({ email: value }).then(user => {
							if (user) {
								return Promise.reject('E-mail already in use');
							}
						});
					}),
					check('password').exists()
					.isLength({ min: 5 }).withMessage('must be at least 5 chars long')
				]
			}
		case 'postLogin':
			{
				return [
					check('email').exists().isEmail(),
					// password must be at least 5 chars long
					check('password').exists()
				]
			}
	}
}

/**
 * Get all Users - NOT USED
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
let getUsers = function(req, res) {
	let query = {};
	query = req.query;
	User.find(query).then((users) => {
			res.status(200).send(users);
		})
		.catch((error) => {
			res.status(400).send(error);
		})
};

/**
 * GET User by Id - NOT USED
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
let getUser = function(req, res) {
	User.findById(req.params.id).then((user) => {
			res.status(200).send(user);
		})
		.catch((error) => {
			res.status(404).send(error);
		});
};


/**
 * Singup User API
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}    
 */
let signupUser = function(req, res) {
	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	let user = new User(req.body);

	user.save(user).then((user) => {

			const options = { expiresIn: '2d', issuer: 'http://localhost' };
			const secret = "mohitkadel";
			const payload = { id: user._id, role: user.role };

			const token = jwt.sign(payload, secret, options);

			let result = {};
			result.data = user;
			result.token = token;

			res.status(200).send(result);
		})
		.catch((error) => {
			console.log(error)
			res.status(400).send("Something went wrong");
		})
};

/**
 * Login API
 * @param  {[type]} req 
 * @param  {[type]} res 
 * @return {[type]}
 */
let postLogin = function(req, res) {
	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

	if (!errors.isEmpty()) {
		res.status(422).json({ errors: errors.array() });
		return;
	}

	User.findOne({ email: req.body.email }).then((user) => {
			let result = {};

			// if (user.status === 0) {
			// 	result.message = 'User is Inactive';
			// 	res.status(401).send(result)
			// 	return;
			// }

			const options = { expiresIn: '2d', issuer: 'http://localhost' };
			const secret = "mohitkadel";
			const payload = { id: user._id, role: user.role };

			const token = jwt.sign(payload, secret, options);

			bcrypt.compare(req.body.password, user.password).then(match => {
				if (match) {
					res.status(200)
					result.data = user;
					result.token = token;
				} else {
					res.status(401)
					result.message = 'Invalid email or password';
				}
				console.log(result)
				res.send(result);
			})
		})
		.catch((error) => {
			console.log(error)
			res.status(404).send({ error: "User not found" });
		})
};


module.exports = {
	postLogin: postLogin,
	getUsers: getUsers,
	getUser: getUser,
	signupUser: signupUser,
	validate: validate
}