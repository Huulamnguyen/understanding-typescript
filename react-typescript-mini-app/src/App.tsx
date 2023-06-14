import React, { useState } from "react";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

import { Todo } from "./todo.model";

function App() {
  const [todos, setTodo] = useState<Todo[]>([]);

  const addNewTodo = (text: string) => {
    setTodo((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={addNewTodo} />
      <TodoList items={todos} />
    </div>
  );
}

export default App;
