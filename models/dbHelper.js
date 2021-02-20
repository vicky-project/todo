const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

async function add(todo) {
	const [id] = await db('todo').insert(todo)
	return findById(id)
}

function find () {
	return db('todo')
}

function findById (id) {
	return db('todo').where({id}).first()
}

function remove (id) {
	return db('todo').where({id}).del()
}

module.exports = { add, find, findById, remove }