import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert'

export default function AddTodo() {
  const dispatch = useDispatch()
  const history = useHistory()
  const todos = useSelector((state) => state.todoReducer.todos)
  let today = new Date()
  const [inputForm, setInputForm] = useState({
    id: todos[todos.length - 1].id + 1,
    title: '',
    description: '',
    status: 0,
    createdAt: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes() < 10 ? "0" : ""}${today.getMinutes()}`
  })

  const onChange = (e) => {
    let value = e.target.value
    let key = e.target.key
    setInputForm({
      ...inputForm,
      [key]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: 'create_todo',
      payload: inputForm
    })
    swal('Todo Added', 'success')
    history.push('/')
  }

  return (
    <>
      <Container fluid className='mt-5 ml-5'>
        <Row className='mt-3 justify-content-center'>
          <Col lg={6} className='shadow p-5'>
            <h2>Create Todo</h2>
            <hr />
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <br /><br />
                <Form.Control type='text' name='title' placeholder='e.g Read' onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <br /><br />
                <Form.Control type='text' name='description' placeholder='e.g Read Manga' onChange={onChange} />
              </Form.Group>
              <Button variant='outline-info' type='submit' onSubmit={onSubmit}>
                Create
   	 					</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}