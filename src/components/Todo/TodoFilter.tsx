import React, { useState } from "react";
import { filter } from "../../models/todo";

import "../../styles/Home/TodosList.scss";

type props = {
  setFilteredTodos: (filter: filter) => void;
  handleFilterClick: () => void;
};

export const TodoFilter = ({ setFilteredTodos, handleFilterClick }: props) => {
  const [activeFilter, setActiveFilter] = useState<filter>(filter.all);
  return (
    <div>
      <div className="todo-filter">
        <div
          className={`btn-filter ${
            activeFilter === filter.all ? "active" : ""
          }`}
          onClick={() => {
            setFilteredTodos(filter.all);
            setActiveFilter(filter.all);
            handleFilterClick();
          }}
        >
          All
        </div>
        <div
          className={`btn-filter ${
            activeFilter === filter.active ? "active" : ""
          }`}
          onClick={() => {
            setFilteredTodos(filter.active);
            setActiveFilter(filter.active);
            handleFilterClick();
          }}
        >
          Active
        </div>
        <div
          className={`btn-filter ${
            activeFilter === filter.completed ? "active" : ""
          }`}
          onClick={() => {
            setFilteredTodos(filter.completed);
            setActiveFilter(filter.completed);
            handleFilterClick();
          }}
        >
          Completed
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
