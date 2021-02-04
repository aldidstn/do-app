import React from 'react'
import TodoCard from '../components/TodoCard'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function Mainpage() {
  const todos = useSelector(state => (
    state.todoReducer.todos
  ))

  return (
    <Container>
      <h2>Finished</h2>
      <hr />
      <Row>
        {todos.map(data => (
          data.status === 0 ? <TodoCard key={data.id} data={data} /> : ''
        ))}
      </Row>
      <h2>Unfinished</h2>
      <hr />
      <Row>
        {todos.map(data => (
          data.status === 1 ? <TodoCard key={data.id} data={data} /> : ''
        ))}
      </Row>
    </Container>
  )
}