import React from "react"
import { Provider } from "react-redux"
import store from "../redux/store"

import TodoForm from "./TodoForm"
import TodoList from "./TodoList"

function App() {
  return (
    <Provider store={store}>
      <TodoForm />
      <TodoList />
    </Provider>
  )
}

export default App
