import React from "react";

interface TodolistProps {
  items: { id: string; text: string }[];
}

const TodoList: React.FC<TodolistProps> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
