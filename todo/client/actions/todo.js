import { deleteATodo, getAllTodos, postATodo, updateATodo } from "../apis/todo"

export const FETCH_TODO_PENDING = 'FETCH_TODO_PENDING'
export const POST_TODO_PENDING = 'POST_TODO_PENDING'
export const UPDATE_TODO_PENDING = 'UPDATE_TODO_PENDING'
export const DELETE_TODO_PENDING = 'DELETE_TODO_PENDING'
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS'
export const POST_TODO_SUCCESS = 'POST_TODO_SUCCESS'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'

export function fetchTodoPending () {
    return {
        type: FETCH_TODO_PENDING
    }
}

export function postTodoPending () {
    return {
        type: POST_TODO_PENDING
    }
}

export function updateTodoPending () {
    return {
        type: UPDATE_TODO_PENDING
    }
}

export function deleteTodoPending () {
    return {
        type: DELETE_TODO_PENDING
    }
}

export function fetchTodoSuccess (todos) {
    return {
        type: FETCH_TODO_SUCCESS,
        todos: todos
    }
}

export function postTodoSuccess (todos) {
    return {
        type: POST_TODO_SUCCESS,
        todos: todos
    }
}

export function updateTodoSuccess (todos) {
    return {
        type: UPDATE_TODO_SUCCESS,
        todos: todos
    }
}

export function deleteTodoSuccess (todos) {
    return {
        type: DELETE_TODO_SUCCESS,
        todos: todos
    }
}

export function getTodos () {
    return (dispatch) => {
        dispatch(fetchTodoPending())
        return getAllTodos()
        .then((todos) => {
            dispatch(fetchTodoSuccess(todos))
            return null
        })
    }
}

export function postTodo (todo) {
    return (dispatch) => {
        dispatch(postTodoPending())
        return postATodo(todo)
        .then(() => {
            return getAllTodos()
            .then((todos) => {
                dispatch(postTodoSuccess(todos))
                return null
            })
        })
    }
}

export function updateTodo (id, task, priority, completed) {
    return (dispatch) => {
        dispatch(updateTodoPending())
        return updateATodo(id, task, priority, completed)
        .then(() => {
            return getAllTodos()
            .then((todos) => {
                dispatch(updateTodoSuccess(todos))
                return null
            })
        })
    }
}

export function deleteTodo (id) {
    return (dispatch) => {
        dispatch(deleteTodoPending())
        return deleteATodo(id)
        .then(() => {
            return getAllTodos()
            .then((todos) => {
                dispatch(deleteTodoSuccess(todos))
                return null
            })
        })
    }
}