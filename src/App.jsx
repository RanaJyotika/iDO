import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  // Todo is input text
  const [todo, setTodo] = useState([]);
  // todos is an array that hold all todos
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // saving to local storage
  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  // this useEffect will only once and load all the todos in the local storage
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handleSave = () => {
    // it hold all prev other todos plus add the current(new) todo.
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    // console.log(todos);
    saveToLocalStorage();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    // console.log(newTodos);
    saveToLocalStorage();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    // then deleting the prev todo
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };
  return (
    <>
      <div className="flex justify-center h-screen items-center bg-gradient-to-r from-violet-200  via-yellow-100 to-pink-200">
        <div className="container p-5 h-[42rem] w-[40rem] border border-white/10 flex flex-col backdrop-blur-xl shadow-2xl rounded-xl bg-white/40 max-sm:w-full">
          <h1 className="h-[12%] text-center text-violet-900 font-bold text-5xl flex justify-center items-center bg-white/10 backdrop-blur-xl shadow-xl rounded-xl border-white/10">
            iDo<i>📝</i>
          </h1>
          {/* input- to add todo here */}
          <div className="h-[88%]  mt-5  border-2 border-black/10 rounded-xl  p-2">
            <div className=" flex flex-row add-todo  h-[12%] items-center">
              <input
                onChange={handleChange}
                value={todo}
                type="text"
                placeholder="Enter your todo here"
                className=" h-9 w-full rounded-xl bg-transparent border-black/10 border-2 p-4  m-1 focus:outline-none"
              />
              <button
                onClick={handleSave} disabled={todo.length <= 3}
                className="border rounded-xl py-1 p-3 text-md text-white h-9 font-semibold bg-violet-800 m-1 hover:bg-violet-950 disabled:bg-violet-950 disabled:text-gray-500 border-violet-800 mx-1"
              >
                Save
              </button>
            </div>

            <input type="checkbox" checked={showFinished} onChange={toggleFinished} /> Show Finished

            {/* list of todos and with buttons to edit and delete them and checkbox */}
            <div className=" todos h-[85%] p-2.5">
              <h2 className="text-lg font-bold text-black/60">Your Todos</h2>
              {todos.length === 0 && (
                <div className="m-5">
                  <img
                    src="/noTodo.png"
                    alt="no todos"
                    className=" h-80 m-20"
                  />
                </div>
              )}
              {todos.map((item) => {
                return ((showFinished || !item.isCompleted) &&
                  <div
                    key={item.id}
                    className="todo flex  justify-between items-center border p-1.5 my-2 rounded-md"
                  >
                    <div className="flex gap-2 ">
                      <input
                        className="mx-1 my-2 w-[10%] h-[30%]"
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        name={item.id}
                      />
                      <div className={`w-[50%] ${item.isCompleted ? "line-through" : ""}`}>
                        {item.todo}
                      </div>
                    </div>

                    <div className="buttons  justify-center align-middle mx-1 flex h-full w-[30%] ">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="border rounded-xl py-1 p-3 text-md text-white font-semibold bg-violet-800 hover:bg-violet-950 border-violet-800 mx-1"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="border rounded-xl py-1 p-3 text-md text-white font-semibold bg-violet-800 hover:bg-violet-950 border-violet-800 mx-1"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
