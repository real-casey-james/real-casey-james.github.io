const express = require('express')

const db = require('../db/todo')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
    db.listTodos()
    .then((todos) => {
        res.json(todos)
    })
})

router.post('/', (req, res) => {
    db.addTodo(req.body.todo)
    .then((todo) => {
        res.json(todo)
    })
})

router.patch('/', (req, res) => {
    const { id, task, priority, completed } = req.body
    db.updateTodo(id, task, priority, completed)
    // const { id, task, priority, completed } = req.body
    // db.updateTodo(id, task, priority, completed)
    .then((todo) => {
        res.json(todo)
    })
})

router.delete('/', (req, res) => {
    db.deleteTodo(req.body.id)
    .then((response) => {
        res.json(response)
    })
})