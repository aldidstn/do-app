import React, { useEffect } from 'react'
import { Mainpage, AddTodo } from './pages'
import { Navbar, Nav } from 'react-bootstrap'
import { fetchTodo } from './store/action/todoAction'
import { useDispatch } from 'react-redux'
import { Switch, Route, NavLink } from 'react-router-dom'

export default function App() {
  const dispatch = useDispatch()

  useEffect(_ => {
    dispatch(fetchTodo())
  }, [dispatch])

  return (
    <div>
      <Navbar bg='light' variant='light'>
        <Navbar.Brand>To-do App</Navbar.Brand>
        <Nav className='mr-auto'>
          <NavLink className='mx-2' to='/'>Home</NavLink>
          <NavLink className='mx-2' to='/add'>Add Todo</NavLink>
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path='/'>
          <Mainpage />
        </Route>
        <Route path='/add'>
          <AddTodo />
        </Route>
      </Switch>
    </div>
  )
}
