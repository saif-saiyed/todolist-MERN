import React from 'react';

const TodoItem = ({ todo, completeTodo, deleteTodo }) => 
{
  return (
    <div className={"todo" + (todo.complete ? " is-complete" : "")} onClick={() => completeTodo(todo._id)}>
      <div className="checkbox"></div>
      <div className="text">{todo.text}</div>
      <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>Delete</div>
    </div>
  );
}

export default TodoItem;
