import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Badge, Card, Form, Modal, Col, Button } from 'react-bootstrap'
import swal from 'sweetalert'

export default function TodoCard(props) {
  console.log(props)
  const { data } = props
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleHide = () => setShow(false)
  const [inputForm, setInputForm] = useState({
    id: data.id,
    title: data.title,
    description: data.description,
    status: data.status,
    createdAt: data.createdAt,
  })

  const handleDelete = () => {
    if (data.status ^ 1) {
      dispatch({
        type: 'delete_todo',
        payload: data.id
      })
      swal('Success', `No.${data.id} deleted`, 'success')
      setShow(false)
    } else {
      swal('Cant remove todo!')
    }
  }

  const handleUpdate = () => {
    dispatch({
      type: 'update_todo',
      payload: inputForm
    })
    swal(`No.${data.id} updated`, 'success')
    setShow(false)
  }

  const onChange = (e) => {
    let value = e.target.value
    let key = e.target.name

    if (key === 'status') {
      value = +value
    }
    setInputForm({
      ...inputForm,
      [key]: value
    })
  }

  return (
    <>
      <Col lg='4' className='p-3'>
        <Card style={{boxShadow:'5px 10px 18px #efefef'}}>
          <Card.Header as='h4'>{data.title}</Card.Header>
          <Card.Body>
            <small class='text-muted'>{data.createdAt}</small>
            {data.status ^ 1 ? <Badge pill variant='success m-2'>Done</Badge> : <Badge pill variant='info m-2'>Unfinished</Badge>}
            <Card.Text>{data.description}</Card.Text>
            <Button variant='outline-info' onClick={handleShow}>
              Detail
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={show} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Todo Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <br /><br />
              <Form.Control type='text' name='title' placeholder='Enter Title' value={inputForm.title} onChange={onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <br /><br />
              <Form.Control type='text' name='description' placeholder='Enter Description' value={inputForm.description} onChange={onChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as='select' name='status' value={inputForm.status} onChange={onChange}>
                <option value='0'>Done </option>
                <option value='1'>Unfinished</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-info' onClick={handleUpdate}>
            Update
          </Button>
          <Button variant='outline-secondary' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}