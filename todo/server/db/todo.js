const connection = require('./connection')

module.exports ={
    listTodos,
    addTodo,
    updateTodo,
    deleteTodo
}

// get all todos
function listTodos (db = connection) {
    return db('todo').select()
}

// add todo - task & priority
function addTodo (todo, db = connection) {
    return db('todo')
    .insert({
        task: todo,
        priority: 'medium',
        completed: false
    })
}

// update todo
function updateTodo (id, task, priority, completed, db = connection) {
    return db('todo').select()
    .where('id', id)
    .first()
    .update({
        task: task,
        priority: priority,
        completed: completed
    })
}

// delete todo
function deleteTodo (id, db = connection) {
    return db('todo').select()
    .where('id', id)
    .first()
    .del()
}