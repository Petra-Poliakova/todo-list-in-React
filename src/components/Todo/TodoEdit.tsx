import React, { ChangeEventHandler, FormEvent } from "react";

type props = {
  editingData: string;
  setEditingData: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  okEdit: (e: FormEvent<HTMLButtonElement>) => void;
  cancelEdit: (e: FormEvent<HTMLButtonElement>) => void;
};

export const TodoEdit = ({
  editingData,
  setEditingData,
  okEdit,
  cancelEdit,
}: props) => {
  return (
    <div className="edit-box">
      <h4 className="edit-header">Edit your Todo Item</h4>
      <div className="edit-item">
        <textarea
          className="edit-todo-text"
          value={editingData}
          onChange={setEditingData}
        />
        <button className="todo-item-ok" onClick={okEdit}>
          OK
        </button>
        <button className="todo-item-cancel" onClick={cancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  );
};
