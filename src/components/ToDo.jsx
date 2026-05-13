import { useState } from "react";

function ToDo({ todoItem, editTodo, deleteTodo, toggleCompletion, colorClass }) {
  // Track edit mode and updated task text
  const [isEdit, setIsEdit] = useState(false);
  const [newTask, setNewTask] = useState(todoItem.task);

  // Save the edited task
  const handleEdit = () => {
    const trimmedTask = newTask.trim();
    if (!trimmedTask) return;
    editTodo(todoItem.id, trimmedTask);
    setIsEdit(false);
  };

  return (
    <div
      className={`todo-card ${colorClass} ${todoItem.isComplete ? "todo-complete" : ""} hover:shadow-2xl hover:translate-y-1 transition-transform duration-300 ease-in-out rounded-3xl border p-5 shadow-lg shadow-slate-200/70`}
    >
      {/* Edit mode: show input field and save/cancel buttons */}
      {isEdit ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            className="w-full rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-slate-900 outline-none shadow-inner text-sm"
          />
          <div className="flex gap-2">
            <button
              className="rounded-lg bg-amber-500 px-3 py-2 text-white shadow-lg shadow-amber-300/40 text-xs font-semibold"
              onClick={handleEdit}
            >
              <i className="fas fa-floppy-disk mr-1"></i> Save
            </button>
            <button
              className="rounded-lg bg-red-500 px-3 py-2 text-white shadow-lg shadow-red-300/40 text-xs font-semibold"
              onClick={() => setIsEdit(false)}
            >
              <i className="fas fa-xmark mr-1"></i> Cancel
            </button>
          </div>
        </div>
      ) : (
        /* View mode: show task, actions, and status badge */
        <>
          <div className="flex items-start justify-between gap-2">
            <p
              className={`todo-text-highlight flex-1 cursor-pointer ${todoItem.isComplete ? "line-through opacity-70" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => toggleCompletion(todoItem.id)}
            >
              {todoItem.task}
            </p>
            <button className="icon-button shrink-0" aria-label="Delete task" onClick={() => deleteTodo(todoItem.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
          {/* Action buttons with status badge */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                className="inline-text-btn"
                onClick={() => setIsEdit(true)}
              >
                <i className="fas fa-pen mr-1"></i> Edit
              </button>
              <button className="inline-text-btn" onClick={() => toggleCompletion(todoItem.id)}>
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
      )}
    </div>
  );
}

export default ToDo;
