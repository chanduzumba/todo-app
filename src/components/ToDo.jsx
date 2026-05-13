import { useState } from "react";

function ToDo({ todoItem, colorClass }) {
  return (
    <div
      className={`todo-card ${colorClass} ${todoItem.isComplete ? "todo-complete" : ""}`}
    >
      <>
        <div className="flex items-start justify-between gap-2">
          <p
            className={`todo-text-highlight flex-1 cursor-pointer ${todoItem.isComplete ? "line-through opacity-70" : ""}`}
            role="button"
            tabIndex={0}
          >
            {todoItem.task}
          </p>
          <button
            className="icon-button shrink-0"
            aria-label="Delete task"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
        {/* Action buttons with status badge */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <button className="inline-text-btn">
              <i className="fas fa-pen mr-1"></i> Edit
            </button>
            <button className="inline-text-btn">
              {todoItem.isComplete ? (
                <>
                  <i className="fas fa-undo mr-1"></i> Undo
                </>
              ) : (
                <>
                  <i className="fas fa-check mr-1"></i> Done
                </>
              )}
            </button>
          </div>
          {/* Status badge showing task completion state */}
          <span
            className={`status-tag ${todoItem.isComplete ? "status-complete" : "status-pending"}`}
          >
            {todoItem.isComplete ? "Completed" : "Pending"}
          </span>
        </div>
      </>
    </div>
  );
}

export default ToDo;
