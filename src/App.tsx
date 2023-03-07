import React, { useEffect, useState } from "react";
import { NewTodo } from "./components/Todo/NewTodo";
import { TodosList } from "./components/Todo/TodosList";
import { TodoFilter } from "./components/Todo/TodoFilter";
import { TodoEdit } from "./components/Todo/TodoEdit";
import { TodoCount } from "./components/Todo/TodoCount";
import { TodoType, filter } from "./models/todo";
//styles
import "./styles/App.scss";
import "./styles/Home/TodoFilter.scss";

//components
import TheNavigation from "./components/TheNavigation";

export const App = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  var [editingData, setEditingData] = useState<{
    id: string;
    text: string;
    complete?: boolean;
  }>({ id: "", text: "", complete: false });
  const [filteredTodos, setFilteredTodos] = useState<string>(filter.all);
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  //Load todo
  useEffect(() => {
    let itemsString = localStorage.getItem("todos");
    if (!itemsString) {
      return;
    } else {
      const items = JSON.parse(itemsString);
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
    setIsEditing(false);
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

  const todoListRemove = () => {
    localStorage.removeItem("todos");
    setTodoList([]);
  };

  const filteredList =
    filteredTodos === filter.all
      ? todoList
      : filteredTodos === filter.active
      ? todoList.filter((todo) => !todo.complete)
      : todoList.filter((todo) => todo.complete);

  const handleFilterClick = () => {
    setIsEditing(false);
    setIsFilterClicked(true);
    setTimeout(() => {
      setIsFilterClicked(false);
    }, 500);
  };

  const countTodos = todoList.length;
  const countActiveTodos = todoList.filter((todo) => !todo.complete).length;
  const countCompletedTodos = todoList.filter((todo) => todo.complete).length;

  const filterCounts = {
    all: countTodos,
    active: countActiveTodos,
    completed: countCompletedTodos,
  };

  const renderTodoCount = (filterType: filter, count: number) => {
    return (
      <TodoCount
        count={count}
        filterType={filterType.charAt(0).toUpperCase() + filterType.slice(1)}
      />
    );
  };

  const allCount = filterCounts[filter.all];
  const activeCount = filterCounts[filter.active];
  const completedCount = filterCounts[filter.completed];

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
              <TodoFilter
                setFilteredTodos={setFilteredTodos}
                handleFilterClick={handleFilterClick}
              />
              <div className={`todo-list ${isFilterClicked ? "fade-out" : ""}`}>
                <TodosList
                  items={filteredList}
                  onTodoCompleted={onSelected}
                  onTodoRemove={onTodoRemove}
                  onTodoEdit={onTodoEdit}
                />
              </div>
              {isEditing && (
                <TodoEdit
                  editingData={editingData.text}
                  setEditingData={(e) => {
                    setEditingData({
                      ...editingData,
                      text: e.target.value,
                    });
                  }}
                  okEdit={okEdit}
                  cancelEdit={cancelEdit}
                />
              )}
              <div className="todo-footer">
                {filteredTodos === filter.all
                  ? renderTodoCount(filter.all, allCount)
                  : filteredTodos === filter.active
                  ? renderTodoCount(filter.active, activeCount)
                  : renderTodoCount(filter.completed, completedCount)}
                <button className="remove-todo-list" onClick={todoListRemove}>
                  Remove All Todos
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};
//"homepage": "https://petrapoliakova.sk/kurzy/todoListWeb/",
