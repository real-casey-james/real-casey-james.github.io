import React from 'react'
import { Route } from 'react-router-dom'
import AddTodo from './AddTodo'
import Footer from './Footer'
import ToDoList from './ToDoList'

function App () {

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
      <section className="main">
        <Route exact path='/' component={ToDoList} />
        <Route exact path='/active' component={ToDoList} />
        <Route exact path='/completed' component={ToDoList} />
      </section>
      <footer className="footer">
        {/* <Footer /> */}
        <Route exact path='/' component={Footer} />
        <Route exact path='/active' component={Footer} />
        <Route exact path='/completed' component={Footer} />
      </footer>
    </>
  )
}

export default App
