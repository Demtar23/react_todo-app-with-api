import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../type/Todo';

type Props = {
  todo: Todo;
  onDelete?: (todoId: number) => void;
  isLoading?: boolean;
  onUpdate: (todo: Todo) => Promise<void>;
  onToggle: (todoId: number) => void;
};

export const TodoListItem: React.FC<Props> = ({
  todo,
  onDelete = () => {},
  isLoading,
  onUpdate = () => Promise.resolve(),
  onToggle,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  function savedChanges() {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === title) {
      setIsEditing(false);

      return;
    }

    if (!trimmedTitle) {
      onDelete(id);

      return;
    }

    onUpdate({ ...todo, title: trimmedTitle })
      .then(() => {
        setIsEditing(false);
      })
      .catch(() => {
        editInputRef.current?.focus();
      });
  }

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    savedChanges();
  }

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: completed })}
      key={id}
    >
      <label className="todo__status-label">
        {' '}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onToggle(id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editedTitle}
            onChange={event => setEditedTitle(event.target.value)}
            ref={editInputRef}
            checked={completed}
            onBlur={savedChanges}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => {
            setIsEditing(true);
            setEditedTitle(title);
          }}
        >
          {title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDelete(id)}
        >
          ×
        </button>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
