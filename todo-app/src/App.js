import React, { useState, useCallback, useEffect } from "react";

const App = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const onNewTodoChange = useCallback(event => {
    setNewTodo(event.target.value);
  }, []);

  const formSubmitted = useCallback(
    event => {
      event.preventDefault();
      // prevent user from submitting an empty todo
      if (!newTodo.trim()) return;
      setTodos([
        {
          id: todos.length + 1,
          content: newTodo,
          done: false
        },
        ...todos
      ]);
    },
    [newTodo, todos]
  );

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

  const addTodo = useCallback(
    (todo, index) => event => {
      const newTodos = [...todos];
      newTodos.splice(index, 1, {
        ...todo,
        done: !todo.done
      });
      setTodos(newTodos);
    },
    [todos]
  );

  const removeTodo = useCallback(
    todo => event => {
      setTodos(todos.filter(otherTodo => otherTodo !== todo));
    },
    [todos]
  );

  const markAllDone = useCallback(() => {
    // Create a copy of the array
    // Create a copy of each of the items
    // Update the done property to be true on each of the new items
    const updateTodos = todos.map(todo => {
      return {
        ...todo,
        done: true
      };
    });
    setTodos(updateTodos);
  }, [todos]);

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input id="newTodo" value={newTodo} onChange={onNewTodoChange} />
        <button>Add Todo</button>
      </form>
      <button onClick={markAllDone}>Mark All Done</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? "done" : ""}>{todo.content}</span>
            <button onClick={removeTodo(todo)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
