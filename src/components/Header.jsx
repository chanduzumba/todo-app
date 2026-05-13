function Header({ count }) {
  return (
    <div className="rounded-[2.5rem] bg-linear-to-r from-slate-900 via-violet-700 to-fuchsia-600 px-6 py-6 text-center text-white shadow-2xl shadow-violet-400/25">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-200">
        Organized + colorful tasks
      </p>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        My Todo App
      </h1>
      <p className="mt-2 text-xs text-slate-200 sm:text-sm">
        {count === 0
          ? "Add your first task and keep your day on track."
          : `You have ${count} ${count === 1 ? "task" : "tasks"} ready to conquer.`}
      </p>
    </div>
  );
}

export default Header;