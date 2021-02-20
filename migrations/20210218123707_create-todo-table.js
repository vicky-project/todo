
exports.up = function(knex) {
  return knex.schema.createTable('todo', tbl=>{
  	tbl.increments()
  	tbl.string('todo_name')
  	tbl.timestamps()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todo')
};
