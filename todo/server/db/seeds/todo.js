
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {id: 1, task: 'washing', priority: 'low', completed: false},
        {id: 2, task: 'cooking', priority: 'medium', completed: false},
        {id: 3, task: 'waterblasting', priority: 'high', completed: true},
        
      ]);
    });
};
