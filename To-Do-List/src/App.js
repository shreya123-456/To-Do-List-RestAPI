import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = () => {
    const newTodo = { task, completed: false };
    fetch("http://localhost:8081/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
        setTask("");
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:8081/api/todos/${id}`, { method: "DELETE" })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };

  const toggleComplete = (id, completed) => {
    fetch(`http://localhost:8081/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed, task: todos.find(t => t.id === id).task }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
      });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📝 My To-Do List</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
        style={{ padding: "8px", fontSize: "16px" }}
      />
      <button onClick={addTodo} style={{ marginLeft: "8px", padding: "8px 16px" }}>
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              margin: "8px 0",
              background: "#f9f9f9",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                flex: 1,
                cursor: "pointer",
              }}
              onClick={() => toggleComplete(todo.id, todo.completed)}
            >
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
