import React, { useEffect, useState } from "react";
import { NewTodo } from "./components/Todo/NewTodo";
import { TodosList } from "./components/Todo/TodosList";
import { TodoType } from "./models/todo";
//styles
import "./styles/App.scss";

//components
import TheNavigation from "./components/TheNavigation";

//pages
//import { Home } from "./pages/Home";

export const App = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  var [editingData, setEditingData] = useState<{
    id: string;
    text: string;
    complete?: boolean;
  }>({ id: "", text: "", complete: false });

  //useEffect
  useEffect(() => {
    let items = JSON.parse(localStorage.getItem("todos") || "{}");
    if (!items) {
      return;
    } else {
      items = JSON.parse(localStorage.getItem("todos") || "{}");
      setTodoList(items);
    }
  }, []);

  const onAddTodoHandler = (todoValue: string) => {
    const newTodo = {
      id: new Date().toISOString(),
      text: todoValue,
      complete: false,
    };
    // add the todo to the list
    setTodoList([...todoList, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todoList, newTodo]));
  };

  const onSelected = (id: string) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodoList(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const onTodoRemove = (todoId: string) => {
    let filtered = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(filtered);
    localStorage.setItem("todos", JSON.stringify(filtered));
  };

  const onTodoEdit = (id: string, text: string, complete?: boolean) => {
    setIsEditing(true);

    const editedTodo = todoList.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
        todo.complete = complete;
      }
      return todo;
    });
    setTodoList(editedTodo);

    setEditingData({ id: id, text: text, complete: complete });
  };

  const okEdit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsEditing(false);

    const changeTodo = todoList.map((todo) => {
      if (editingData.id === todo.id) {
        todo.text = editingData.text;
      }
      return todo;
    });
    setEditingData({
      id: editingData.id,
      text: editingData.text,
      complete: editingData.complete,
    });
    setTodoList(changeTodo);
    localStorage.setItem("todos", JSON.stringify(changeTodo));
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };
  return (
    <div className="App">
      <header>
        <TheNavigation />
      </header>
      <main>
        <div className="wrapper">
          <div className="widget-wrapper">
            <div className="widget-grid">
              <h2>Create your Todo list</h2>
              <NewTodo onAddTodo={onAddTodoHandler} />
              <div className="todo-list">
                <TodosList
                  items={todoList}
                  onTodoCompleted={onSelected}
                  onTodoRemove={onTodoRemove}
                  onTodoEdit={onTodoEdit}
                />
              </div>

              {isEditing && (
                <div className="edit-box">
                  <h4 className="edit-header">Edit your Todo Item</h4>
                  <div className="edit-item">
                    <textarea
                      className="edit-todo-text"
                      value={editingData.text}
                      onChange={(e) => {
                        setEditingData({
                          ...editingData,
                          text: e.target.value,
                        });
                      }}
                    />
                    <button className="todo-item-ok" onClick={okEdit}>
                      OK
                    </button>
                    <button className="todo-item-cancel" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};
//"homepage": "https://petrapoliakova.sk/kurzy/todoListWeb/",
