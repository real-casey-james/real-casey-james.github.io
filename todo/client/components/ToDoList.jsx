import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getTodos, updateTodo } from '../actions/todo';
import ToDoItem from './ToDoItem';

let allComplete = false

function ToDoList(props) {
    const current = props.match.path
    useEffect(() => {
        props.dispatch(getTodos())
    }, [])

    const { todos } = props

    function handleToggleAll () {
        if (!allComplete) {
            todos.map((todo) => {
                props.dispatch(updateTodo(todo.id, todo.task, todo.priority, 1))
            })
            allComplete = true
        } else if (allComplete) {
            todos.map((todo) => {
                props.dispatch(updateTodo(todo.id, todo.task, todo.priority, 0))
            })
            allComplete = false
        }
    }

    return (
        <>
        <input id="toggle-all" className="toggle-all" type="checkbox" onClick={() => handleToggleAll()} />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className='todo-list'>
            {current === '/' ? 
            todos?.map((todo) => {
                return ( <ToDoItem key={todo.id} todo={todo} /> ) })
            : current === '/active' ? todos?.map((todo) => {
                if (todo.completed === 0) {
                    return ( <ToDoItem key={todo.id} todo={todo} /> ) } 
                })
            : current === '/completed' ? todos?.map((todo) => {
                if (todo.completed) {
                    return ( <ToDoItem key={todo.id} todo={todo} /> ) } 
                })
            : null
            }
            
        </ul>
        </>
    );
}

function mapStateToProps (state) {
    return {
        todos: state.todo
    }
}

export default connect(mapStateToProps)(ToDoList);