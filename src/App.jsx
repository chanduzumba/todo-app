import { useEffect, useState } from "react";
import Header from "./components/Header";
import ToDoList from "./components/TodoList";

function App() {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || [],
  );
  // Track the current input value
  const [task, setTask] = useState("");
  // Track which action is pending confirmation: delete a task or clear all tasks
  const [pendingAction, setPendingAction] = useState({ type: null, id: null });
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: "" });

  // Save todos to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new task to the list
  const addTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) {
      setToast({ show: true, message: "Please enter a task." });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
      return;
    }
    const newTask = {
      id: Date.now(),
      task: trimmedTask,
      isComplete: false,
    };

    setTodos([...todos, newTask]);
    setTask("");

    // Show success toast
    setToast({ show: true, message: "Task added successfully!" });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  // Update a todo's task text
  const handleEdit = (id, newtask) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, task: newtask } : todo)),
    );

    // Show success toast when edit is complete
    setToast({ show: true, message: "Task edited successfully!" });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  // Remove a todo from the list
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    if (pendingAction.type === "delete" && pendingAction.id === id) {
      setPendingAction({ type: null, id: null });
    }

    // Show success toast after deletion
    setToast({ show: true, message: "Task deleted successfully!" });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  // Open the delete confirmation modal
  const requestDelete = (id) => {
    setPendingAction({ type: "delete", id });
  };

  // Open the clear-all confirmation modal
  const requestClearAll = () => {
    setPendingAction({ type: "clear", id: null });
  };

  // Confirm and complete the pending action
  const confirmAction = () => {
    if (pendingAction.type === "delete" && pendingAction.id !== null) {
      handleDelete(pendingAction.id);
    } else if (pendingAction.type === "clear") {
      setTodos([]);
      setToast({ show: true, message: "All tasks cleared successfully!" });
      setTimeout(() => setToast({ show: false, message: "" }), 3000);
    }
    setPendingAction({ type: null, id: null });
  };

  // Toggle a todo's completion status
  const handleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  };

  return (
    <div className="app-shell px-4 py-8 md:px-10 lg:px-16">
      <Header count={todos.length} />

      <div className="search-bar mx-auto mt-6 flex max-w-full flex-col justify-center gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/80 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Add a new task..."
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="rounded-2xl border sm:w-1/2 w-full border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />
        <button
          className="rounded-2xl bg-violet-600 px-6 py-3 text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          onClick={addTask}
          aria-label="Add task"
        >
          <i className="fas fa-plus mr-2"></i> Add Task
        </button>
        {todos.length > 0 && (
          <button
            className="rounded-2xl bg-red-600 px-6 py-3 text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
            onClick={requestClearAll}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Render the list of todos */}
      <ToDoList
        todos={todos}
        editTodo={handleEdit}
        deleteTodo={requestDelete}
        toggleCompletion={handleCompletion}
      />

      {/* Shared confirmation modal for delete and clear-all actions */}
      {pendingAction.type !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-slate-300">
            <h2 className="text-xl font-semibold text-slate-900">
              {pendingAction.type === "delete" ? "Delete task?" : "Clear all tasks?"}
            </h2>
            <p className="mt-3 text-slate-600">
              {pendingAction.type === "delete"
                ? `Are you sure you want to delete "${todos.find((todo) => todo.id === pendingAction.id)?.task}"?`
                : "Are you sure you want to remove all tasks? This action cannot be undone."}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-2xl border border-slate-300 px-4 py-2 text-slate-700"
                onClick={() => setPendingAction({ type: null, id: null })}
              >
                Cancel
              </button>
              <button
                className="rounded-2xl bg-red-600 px-4 py-2 text-white"
                onClick={confirmAction}
              >
                {pendingAction.type === "delete" ? "Delete" : "Clear All"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
