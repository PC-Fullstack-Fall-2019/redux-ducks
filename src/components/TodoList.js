import React from "react"
import { useTodos } from "../redux/ducks/todos"

export default function(props) {
  const { todos, remove, toggle } = useTodos()

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li
            className={todo.completed ? "completed" : ""}
            key={"todo" + todo.id}
            onClick={e => toggle(todo.id)}
          >
            {todo.title}
            <button onClick={e => remove(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
