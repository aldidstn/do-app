export const fetchTodo = () => {
  return (dispatch) => {
    fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      .then(resp => (
        resp.json()
      ))
      .then(data => {
        dispatch({
          type: 'set_todo',
          payload: data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
