import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export default function App() {
  const [tasks, setTasks] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Incomplete");

  const addTask = () => {
    const data = {
      title: tasks,
      description: desc,
      status: status,
    };
    try {
      axios
        .post("http://localhost:5000/tasks", data)
        .then(() => {
          toast.success("Task Added Successfully");
          getTasks();
        })
        .catch(() => toast.error("Error in adding task"));
    } catch (err) {
      toast.error("Error in adding task");
    }
  };

  const getTasks = () => {
    try {
      axios
        .get("http://localhost:5000/tasks")
        .then((res) => {
          setData(res.data);
        })
        .catch(() => toast.error("Error in fetching tasks"));
    } catch (err) {
      toast.error("Error in fetching tasks");
    }
  };

  const deleteTask = (id: string) => {
    try {
      axios
        .delete(`http://localhost:5000/tasks/${id}`)
        .then(() => {
          toast.success("Task Deleted Successfully");
          getTasks();
        })
        .catch(() => toast.error("Error in deleting task"));
    } catch (err) {
      toast.error("Error in deleting task");
    }
  };

  const updateTask = (id: string, status: string) => {
    try {
      axios
        .put(`http://localhost:5000/tasks/${id}/status`, { status: status })
        .then(() => {
          toast.success("Task Updated Successfully");
          getTasks();
        })
        .catch(() => toast.error("Error in updating task"));
    } catch (err) {
      toast.error("Error in updating task");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState<Task[]>([]);

  return (
    <div className="relative h-screen w-screen font-pops flex justify-center bg-sky-100 items-center">
      <div className="h-[80%] w-[80%] bg-sky-200 rounded-xl shadow-lg shadow-gray-400 relative">
        <div className="absolute top-0 right-0 w-full px-10 h-20 flex justify-between items-center">
          <div className="text-2xl font-bold">TODO</div>
          <div
            className="w-10 h-10 flex cursor-pointer text-sky-200 bg-sky-400 rounded-full active:scale-95 items-center justify-center"
            onClick={() => setAddModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
        </div>
        <div className="h-full w-full pt-20 pb-10 px-10">
          <div className="w-full h-full flex flex-col gap-5">
            {data.map((item: Task, index) => (
              <div
                className="relative w-full h-64 flex bg-sky-600 text-white font-bold rounded-xl overflow-hidden"
                key={item._id}
              >
                <div className="w-20 h-full flex justify-center items-center">
                  {index + 1}
                </div>
                <div className="w-full h-full flex flex-col">
                  <div className="w-full h-full bg-sky-300 text-sky-950 flex justify-between items-center px-10">
                    <div className="font-bold tracking-wider">{item.title}</div>
                  </div>
                  <div className="w-full h-full font-semibold bg-sky-400 text-sky-800 flex justify-between items-center px-10">
                    <div>{item.description}</div>
                    <div className="flex gap-10">
                      {item.status !== "completed" && (
                        <div
                          className="text-sky-200 bg-sky-600 px-5 py-2 rounded-xl"
                          onClick={() => {
                            updateTask(item._id, "completed");
                          }}
                        >
                          Mark as completed
                        </div>
                      )}
                      <div
                        className={` bg-white px-5 py-2 rounded-xl
                          ${
                            item.status === "completed"
                              ? `text-green-500`
                              : `text-red-500`
                          }
                          `}
                      >
                        {item.status === "completed"
                          ? "Completed"
                          : "Incomplete"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute text-blue-800 top-0 right-0 h-10 w-10 flex justify-center items-center">
                  <button onClick={() => deleteTask(item._id)}>
                    <svg
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {addModal && (
        <div className="h-screen w-screen bg-[#00000030] backdrop:filter flex justify-center items-center backdrop-blur-md fixed top-0 left-0">
          <div className="relative w-[20rem] h-[30rem] md:w-[30rem] bg-white px-3 md:px-10 rounded-xl pb-32">
            <div className="h-full w-full flex justify-start mt-10 gap-10 items-center flex-col">
              <div className="text-3xl font-bold text-sky-400">Add Task</div>
              <div className="flex flex-col w-full px-10 gap-2">
                <label htmlFor="title" className="text-sky-950 font-bold">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title here"
                  name="title"
                  id="title"
                  className="px-5 py-2 border-gray-100 border-[2px] cursor-pointer hover:border-sky-400 rounded-xl"
                  onChange={(e) => setTasks(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full px-10 gap-2">
                <label htmlFor="desc" className="text-sky-950 font-bold">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter description here"
                  name="desc"
                  id="desc"
                  className="px-5 py-2 border-gray-100 border-[2px] cursor-pointer hover:border-sky-400 rounded-xl"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 px-16 py-8 gap-5 flex justify-between items-center">
              <button
                onClick={() => setAddModal(false)}
                className="hover:bg-gray-100 border-gray-200 border-[1px] rounded-xl cursor-pointer text-gray-600 w-full h-full flex justify-center items-center"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addTask();
                  setAddModal(false);
                }}
                className="bg-sky-400 rounded-xl cursor-pointer hover:bg-sky-500 text-white w-full h-full flex justify-center items-center"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
