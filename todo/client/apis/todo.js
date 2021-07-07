import request from 'superagent'

export function getAllTodos () {
    return request.get('/api/v1/todos')
    .then((res) => res.body)
}

export function postATodo (todo) {
    return request.post('/api/v1/todos')
    .send({todo})
    .then((res) => res.body)
}

export function updateATodo (id, task, priority, completed) {
    return request.patch('/api/v1/todos')
    .send({id, task, priority, completed})
    .then((res) => res.body)
}

export function deleteATodo (id) {
     return request.delete('/api/v1/todos')
    .send({id})
    .then((res) => res.body)
}