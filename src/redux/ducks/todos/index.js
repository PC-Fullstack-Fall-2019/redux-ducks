import Axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

// action names
const LIST_TODOS = "todo/LIST_TODOS"

// reducer
const initialState = {
  todos: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_TODOS:
      return { ...state, todos: action.payload }
    default:
      return state
  }
}

// custom hook
export function useTodos() {
  const dispatch = useDispatch()
  const todos = useSelector(appState => appState.todoReducer.todos)
  const add = todo => dispatch(addTodo(todo))
  const remove = id => dispatch(removeTodo(id))
  const fetch = () => dispatch(listTodos())
  const toggle = id => dispatch(toggleTodo(id))

  useEffect(() => {
    fetch()
  }, [])

  return { todos, add, remove, fetch, toggle }
}

// actions
function addTodo(todo) {
  return dispatch => {
    Axios.post("/todos", { title: todo, completed: false }).then(resp => {
      dispatch(listTodos())
    })
  }
}

function listTodos() {
  return dispatch => {
    Axios.get("/todos").then(resp => {
      dispatch({
        type: LIST_TODOS,
        payload: resp.data
      })
    })
  }
}

function removeTodo(id) {
  return dispatch => {
    Axios.delete("/todos/" + id).then(resp => {
      dispatch(listTodos())
    })
  }
}

function toggleTodo(id) {
  return dispatch => {
    Axios.get("/todos/" + id).then(resp => {
      const todo = resp.data
      Axios.patch("/todos/" + todo.id, { completed: !todo.completed }).then(
        resp => {
          dispatch(listTodos())
        }
      )
    })
  }
}
