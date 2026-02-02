import React from 'react';

import cn from 'classnames';
import { FilterOptions } from '../../type/filterOptions';

type Props = {
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
  hasCompletedTodos: boolean;
  activeTodoCount: number;
  onClearCompleted?: () => void;
};

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  hasCompletedTodos,
  activeTodoCount,
  onClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodoCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === FilterOptions.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterOptions.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === FilterOptions.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterOptions.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === FilterOptions.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterOptions.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
