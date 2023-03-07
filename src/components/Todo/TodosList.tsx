import React from "react";
import { TodoType } from "../../models/todo";

import { TodoItem } from "./TodoItem";
import "../../styles/Home/TodosList.scss";

type props = {
  items: TodoType[];
  onTodoCompleted: (id: string) => void;
  onTodoRemove: (id: string) => void;
  onTodoEdit: (id: string, text: string, complete?: boolean) => void;
};

export const TodosList = ({
  items,
  onTodoCompleted,
  onTodoRemove,
  onTodoEdit,
}: props) => {
  return (
    <ul className="todo-list">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          doneTodo={item.complete}
          todoCompleted={() => onTodoCompleted(item.id)}
          todoRemove={() => onTodoRemove(item.id)}
          todoEdit={() => onTodoEdit(item.id, item.text, item.complete)}
        />
      ))}
    </ul>
  );
};
