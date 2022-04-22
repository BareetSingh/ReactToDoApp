import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import ToDoList from './components/ToDoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run once when app starts
  useEffect(() => {
    getToDosFromLocal();
  }, []);

  useEffect(() => {
    filterHandler();
    saveToDosInLocal();
  }, [todos, status]);

  //function
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todos) => todos.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todos) => todos.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  //save in local storage
  const saveToDosInLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getToDosFromLocal = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else {
      let localToDos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localToDos);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Bareet's ToDo App {inputText}</h1>

      </header>
      <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} setStatus={setStatus} />
      <ToDoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
