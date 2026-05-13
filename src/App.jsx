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
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: "" });

  // Save todos to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add a new task to the list
  const addTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

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

  return (
    <div className="app-shell px-4 py-8 md:px-10 lg:px-16">
      <Header count={todos.length} />

      <div className="search-bar mx-auto mt-6 flex max-w-3xl flex-col justify-around gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/80 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Add a new task..."
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="rounded-2xl border sm:w-3/4 w-full border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />
        <button
          className="rounded-2xl bg-violet-600 px-6 py-3 text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          onClick={addTask}
          aria-label="Add task"
        >
          <i className="fas fa-plus mr-2"></i> Add Task
        </button>
      </div>

      {/* Render the list of todos */}
      <ToDoList
        todos={todos}
      />

      {/* Toast notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-green-500 px-4 py-2 text-white shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
