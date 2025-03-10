import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeTask } from "./utilities/counterSlice.js";
import { deleteTask } from "./utilities/counterSlice.js";
import { useEffect } from "react";

function App() {
  const [message, setTasks] = useState([]);
  const [images, setImages] = useState([]);
  const [date, setDate] = useState("");
  const dispatch = useDispatch();
  const allreadyAddTask = useSelector((state) => state.counter.tasks);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://api.pexels.com/v1/curated", {
          headers: {
            Authorization:
              "j40IrgiV4mTDOKKxGezFKdwJQujonzqIGjrlXfUhNPtngw3lZ2uephnY",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const imageUrls = result.photos.map((photo) => photo.src.medium);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchImages(); // Call the async function
  }, []);

  const addTask = () => {
    if (message && date) {
      // Ensure both task and date are provided
      dispatch(storeTask({ message, date }));
      setTasks(""); // Clear task input after submission
      setDate(null);
      window.location.reload();// Clear date picker
    } else {
      alert("Please enter a task and select a date!");
    }
  };



  const editTask = (id) => {
 alert(id)
  }
  return (
    <>

      <div className="flex flex-col sm:flex-row md:items-stretch">
        <textarea
          rows="2"
          className="p-2.5 w-full sm:w-full  text-sm text-gray-900 bg-white rounded-lg border border-black mb-2 sm:mb-0 sm:mr-2"
          placeholder="Type your message..."
          onChange={(event) => setTasks(event.target.value)}
          value={message}
        ></textarea>
        <div className="flex sm:flex-row r">
          <DatePicker
            className="bg-white rounded-md border border-black h-[50px] sm:h-[60px] sm:w-full text-sm text-gray-900 p-2.5"
            placeholderText="Select date"
            selected={date}
            onChange={(date) => setDate(date)}
          />
          <button
            type="submit"
            className="inline-flex justify-center items-center p-2 text-black rounded-full mx-2"
            onClick={() => addTask()}
          >
            <svg
              className="w-6 h-6 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {allreadyAddTask.length > 0 &&
          allreadyAddTask.map((task, index) => (
            <div key={task.id}>
              <div className="flex flex-col  my-3 bg-white border border-gray-300 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                  className="object-cover w-full rounded-t-lg h-[250px] md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src={images[index] || "https://via.placeholder.com/150"}
                  alt="Task"
                />
                <div className="flex flex-col justify-between p-4 leading-normal items-start ">
                  <p className=" font-normal text-gray-700 dark:text-gray-400 text-left">
                    {task.task.message}
                  </p>
                  <p className=" font-normal text-gray-700 dark:text-gray-400">
                    {task.task.date}
                  </p>
                  <div className="flex flex-row">
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => dispatch(deleteTask(task.id))}
                    >
                      Remove Task
                    </button>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => editTask(task.id)}>
                      Edit Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
