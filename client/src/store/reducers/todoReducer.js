const initialState = {
  todos: [],
}

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'set_todo':
      return { ...state, todos: action.payload }
    case 'create_todo':
      const newTodo = state.todos.concat(action.payload)
      return { ...state, todos: newTodo }
    case 'update_todo':
      const todoIndex = state.todos.findIndex(el => el.id === action.payload.id)
      const updatedTodo = state.todos.slice(0, todoIndex).concat(action.payload).concat(state.todos.slice(todoIndex + 1))
      return { ...state, todos: updatedTodo }
    case 'delete_todo':
      const deletedTodo = state.todos.filter(data => data.id !== action.payload)
      return { ...state, todos: deletedTodo }
    default:
      return state
  }
}