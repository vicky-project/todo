const Todo = require('../models/dbHelper')

module.exports.getData = (req, res) => {
	Todo.find().then(data=>res.json(data))
}

module.exports.postData = (req, res) => {
	let data = req.body
	data.created_at = new Date()
	Todo.add(data).then(data=>{
		res.json(data)
	}).catch(err=>res.status(500).json({message:"Failed to add todo"}))
}

module.exports.deleteData = (req, res) => {
	Todo.remove(req.params.id).then(data=>res.json(data))
		.catch(err=>res.status(500).json({message: `Failed to delete item. Error: ${err}`}))
}

