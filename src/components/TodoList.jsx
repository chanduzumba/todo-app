import ToDo from "./ToDo";

function ToDoList({ todos, editTodo, deleteTodo, toggleCompletion }) {
  // Array of color gradient classes to cycle through todos
  const colorClasses = ["card-1", "card-2", "card-3", "card-4", "card-5"];

  return (
    <div className="todo-list mx-auto mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {/* Show empty state if no todos exist */}
      {todos.length === 0 ? (
        <div className="empty-state col-span-full rounded-4xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-600 shadow-lg shadow-slate-200/70">
          No tasks yet — start by adding a colorful task card above.
        </div>
      ) : (
        /* Render each todo item with rotating color classes */
        todos.map((todoItem, index) => (
          <ToDo
            key={todoItem.id}
            todoItem={todoItem}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            toggleCompletion={toggleCompletion}
            colorClass={colorClasses[index % colorClasses.length]}
          />
        ))
      )}
    </div>
  );
}

export default ToDoList;
