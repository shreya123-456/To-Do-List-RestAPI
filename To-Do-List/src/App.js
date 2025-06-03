import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch all todos from backend
  useEffect(() => {
    fetch('http://localhost:8081/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  // Add new todo
  const addTodo = () => {
    const newTodo = { title: title, completed: false };
    fetch('http://localhost:8081/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setTitle('');
      })
      .catch((err) => console.error('Error:', err));
  };

  // Toggle complete
  const toggleComplete = (id, completed) => {
    fetch(`http://localhost:8081/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      })
      .catch((err) => console.error('Error:', err));
  };

  // Delete todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:8081/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div className="App">
      <h1>📝 My To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(todo.id, todo.completed)}>
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
