import { CheckCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");

    toast.success("Your task was added successfully");
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Your task was deleted successfully");
  };

  return (
    <section className="px-4 py-16">
      <main className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl ">
          David&#39;s To-Do App
        </h1>
        <div className="max-w-md p-6 mx-auto my-10 bg-white rounded-lg shadow-md">
          <form className="flex mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-grow p-2 mr-2 border border-gray-300 rounded"
              placeholder="Add a new task"
            />
            <button
              onClick={handleAddTodo}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </form>
        </div>
        {todos.length > 0 && (
          <h4 className="mb-3 text-lg font-semibold text-center text-gray-700">
            Your tasks
          </h4>
        )}
        {todos.length < 1 ? (
          <div className="flex items-center justify-center h-64">
            <p className="font-medium text-center text-stone-700">
              No task found! Please enter a task to get started
            </p>
          </div>
        ) : (
          <ul className="max-w-md mx-auto space-y-5 h-[50dvh] overflow-auto">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-2 border-b border-gray-200 rounded-md ${
                  todo.completed ? "bg-green-100" : ""
                }`}
              >
                <div className="flex items-center flex-grow">
                  <CheckCircle
                    className={`mr-2 cursor-pointer ${
                      todo.completed ? "text-green-500" : "text-gray-300"
                    }`}
                    onClick={() => handleToggleTodo(todo.id)}
                  />
                  <span
                    className={`flex-grow ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <Trash2
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="py-1 ml-2 text-red-500 rounded cursor-pointer size-8 hover:text-red-600"
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </section>
  );
}

export default App;
