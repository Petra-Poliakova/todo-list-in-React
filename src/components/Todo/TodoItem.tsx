//import React, { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

import "../../styles/Home/TodoItem.scss";

type propsType = {
  doneTodo?: boolean;
  text: string;
  todoCompleted: () => void;
  todoRemove: () => void;
  todoEdit: () => void;
};

export const TodoItem = ({
  text,
  doneTodo,
  todoCompleted,
  todoRemove,
  todoEdit,
}: propsType) => {
  return (
    <>
      <li className="todo-item">
        <div className="todo-item-check">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={doneTodo}
            onChange={todoCompleted}
          />
        </div>
        <div className="todo-item-text ">{text}</div>
        <div className="todo-item-edit" onClick={todoEdit}>
          <FontAwesomeIcon icon={faFilePen} />
        </div>
        <div className="todo-item-delete" onClick={todoRemove}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </li>
    </>
  );
};
