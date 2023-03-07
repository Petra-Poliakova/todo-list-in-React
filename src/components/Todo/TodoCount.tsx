import React from "react";

import "../../styles/Home/TodoCount.scss";

type props = {
  count: number;
  filterType: string;
};

export const TodoCount = ({ count, filterType }: props) => {
  return (
    <>
      <div className="todo-count">
        {filterType} todos: {count}
      </div>
    </>
  );
};
