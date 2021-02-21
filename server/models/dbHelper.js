const knex = require('knex')
const config = require('../../knexfile')
const db = knex(config.development)

async function add(todo) {
	const [id] = await db('todo').insert(todo)
	return find()
}

function find () {
	return db('todo').orderBy('updated_at', 'desc')
}

function findById (id) {
	return db('todo').where({id}).first()
}

function remove (id) {
	return db('todo').where({id}).del()
}

function update (id, data) {
	return db('todo').where({id}).update(data)
}

module.exports = { add, find, findById, remove, update }