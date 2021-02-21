
exports.up = function(knex) {
  return knex.schema.createTable('todo', tbl=>{
  	tbl.increments()
  	tbl.string('title')
  	tbl.string('description')
  	tbl.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todo')
};
