import React, { useState } from 'react'
import { connect } from 'react-redux'

import { postTodo } from '../actions/todo'

function AddTodo (props) {
  const [input, setInput] = useState('')

  function handleChange (e) {
    setInput(e.target.value)
  }

  function handleSubmit (e) {
    if (e.key === 'Enter') {
      props.dispatch(postTodo(input))
      setInput('')
    }
  }

  return (
    <>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus={true} value={input} onChange={(e) => handleChange(e)} onKeyPress={(e) => handleSubmit(e)} />
    </>
  )
}

function mapStateToProps (state) {
  return {
      todos: state.todo
  }
}

export default connect(mapStateToProps)(AddTodo)
