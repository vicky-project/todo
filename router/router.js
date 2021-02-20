const todoController = require('../controllers/todoController')
const homeController = require('../controllers/homeController')
const bodyParser = require('body-parser')
const router = require('express').Router()

const urlencodedParser = bodyParser.urlencoded({extended: false})

router.route('/')
	.get(homeController.home)
router.route('/api/todo')
	.get(todoController.getData)
	.post(urlencodedParser, todoController.postData)
router.route('/api/todo/:id')
	.delete(todoController.deleteData)

module.exports = router