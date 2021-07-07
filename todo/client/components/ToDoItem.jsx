import React, { useState } from 'react';
import { deleteTodo, updateTodo } from '../actions/todo';
import { connect } from 'react-redux'

function ToDoItem(props) {
    const {todo} = props

    function handleDelete (id) {
        props.dispatch(deleteTodo(id))
    }

    const [editClass, setEditClass] = useState('')
    function handleDoubleClick () {
        setEditClass('editing')
    }
    function handleUnDoubleClick () {
        setEditClass('')
    }

    const [value, setValue] = useState(todo.task)
    function handleChange (e) {
        setValue(e.target.value)
    }

    function handleSubmit (e) {
        if (e.key === 'Enter') {
            props.dispatch(updateTodo(todo.id, value, todo.priority, todo.completed))
            setEditClass('')
        }
    }

    function handleToggle (completed) {
        if (!completed) {
            props.dispatch(updateTodo(todo.id, value, todo.priority, 1))
        } else {
            props.dispatch(updateTodo(todo.id, value, todo.priority, 0))
        }
    }

    return (
            <li className={todo.completed ? 'completed' : editClass} key={todo.id}>
                    <div className="view">
                    <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.completed)} />
                    <label onDoubleClick={() => handleDoubleClick()} htmlFor="">{todo.task}</label>
                    <button onClick={() => handleDelete(todo.id)} className="destroy"></button>
                    </div>
                    <input className="edit"  value={value} onChange={(e) => handleChange(e)} onKeyPress={(e) => handleSubmit(e)} onDoubleClick={() => handleUnDoubleClick()} />
                </li>
    );
}

function mapStateToProps (state) {
    return {
        todos: state.todo
    }
}

export default connect(mapStateToProps)(ToDoItem);