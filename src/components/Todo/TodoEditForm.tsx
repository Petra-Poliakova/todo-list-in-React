import React, { FormEvent, useRef } from "react";

export type propsType = {
  okEdit: (text: string) => void;
  cancelEdit: () => void;
};

export const TodoEditForm = ({ okEdit, cancelEdit }: propsType) => {
  const textValueRef = useRef<HTMLInputElement>(null);

  const okEditHandler = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const enteredTextEdit = textValueRef.current!.value;

    if (enteredTextEdit.trim().length === 0) {
      return;
    }
    console.log("enteredTextEdit", enteredTextEdit);
    okEdit(enteredTextEdit);

    // clear input box
  };
  return (
    <form className="add-todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="Edit todo"
        ref={textValueRef}
      />
      <button onClick={okEditHandler}>OK</button>
      <button onClick={cancelEdit}>Cancel</button>
    </form>
  );
};
