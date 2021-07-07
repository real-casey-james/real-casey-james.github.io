import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { deleteTodo } from '../actions/todo';

function Footer(props) {
  const current = props.match.path

  const [uncompleted, setUncompleted] = useState(0)
  const [items, setItems] = useState('items')
  const { todos } = props
  
  useEffect(() => {
    let i = 0
    todos.map((todo) => {
      !todo.completed ? i++ : null
    })
    setUncompleted(i)
    if (i === 1) {
      setItems('item')
    } else {
      setItems('items')
    }
  }, [todos])

  function clearComplete () {
    todos.map((todo) => {
      if (todo.completed) {
        props.dispatch(deleteTodo(todo.id))
      }
    })
  }

    return (
        <>
           <span className="todo-count"><strong>{uncompleted}</strong> {items} left</span> 
           <ul className="filters">
          {current === '/' ?
            <>
            <li>
              <a className="selected" href="#/">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
            </>
        : current === '/active' ?
        <>
            <li>
              <a href="#/">All</a>
            </li>
            <li>
              <a className="selected" href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
            </>
        : current === '/completed' ?
            <>
            <li>
              <a href="#/">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a className="selected" href="#/completed">Completed</a>
            </li>
            </>
        : null
        }
          <button className="clear-completed" onClick={() => clearComplete()} >Clear completed</button>

          <footer className="info">
      <p>Double-click to edit a todo</p>
     
      <p>Created by <a href="http://real-casey-james.github.io/">Casey James</a></p>

    </footer>
        </ul>
        </>
    );
}

function mapStateToProps (state) {
  return {
      todos: state.todo
  }
}

export default connect(mapStateToProps)(Footer);