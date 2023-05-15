import React from 'react';

const Popup = ({ setPopupActive, newTodo, setNewTodo, addTodo }) => 
{
  return (
    <div className="popup">
      <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
      <div className="content">
        <h3>Add Your New Task</h3>
        <input
          type="text"
          className="add-todo-input"
          onChange={e => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <div className="button" onClick={addTodo}>Insert Task</div>
      </div>
    </div>
  );
}

export default Popup;
