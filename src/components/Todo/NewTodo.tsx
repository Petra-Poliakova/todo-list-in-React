import React, { useRef, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "../../styles/Home/NewTodo.scss";

export type propsType = {
  onAddTodo: (text: string) => void;
};

export const NewTodo = ({ onAddTodo }: propsType) => {
  const textValueRef = useRef<HTMLInputElement>(null);

  const AddTodo = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const enteredText = textValueRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }
    onAddTodo(enteredText);

    // clear input box
    textValueRef.current!.value = "";
  };

  return (
    <form className="add-todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="Add Todo"
        ref={textValueRef}
      />
      <button className="todo-btn" onClick={AddTodo}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};
