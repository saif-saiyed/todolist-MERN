import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Popup from './components/Popup';
import './index.css';

const API_BASE = "http://localhost:5000";

function App() 
{
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => 
  {
    getTodos();
  }, []);

  const getTodos = () => 
  {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error: ", err));
  }

  const completeTodo = async id => 
  {
    const data = await fetch(API_BASE + "/todo/complete/" + id)
      .then(res => res.json());

      setTodos(todos => todos.map(todo => 
        {
        if (todo._id === data._id) 
        {
          todo.complete = data.complete;
        }
        return todo;
      }));
    }
  
    const deleteTodo = async id => 
    {
      const data = await fetch(API_BASE + "/todo/delete/" + id, 
      {
        method: "DELETE",
      }).then(res => res.json());
  
      setTodos(todos => todos.filter(todo => todo._id !== data._id));
    }
  
    const addTodo = async () => 
    {
      const data = await fetch(API_BASE + "/todo/new", 
      {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: newTodo
        })
      }).then(res => res.json());
  
      setTodos([...todos, data]);
      setPopupActive(false);
      setNewTodo("");
    }
  
    return (
      <div className="App">
        <h1>To Do List - Task Planner</h1>
        <h4>YOUR LISTED TASKS </h4>
  
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
  
        <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
  
        {popupActive && (
          <Popup
            setPopupActive={setPopupActive}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            addTodo={addTodo}
          />
        )}
      </div>
    );
  }
  export default App;