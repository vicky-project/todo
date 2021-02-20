const fs = require('fs')
const Todo = require('../models/dbHelper')

module.exports.render = (req, res) => {
	const file = req.params.name
	Todo.find().then(data=>res.render(`partials/${file}`, {todos: data}))
}