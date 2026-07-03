import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    completed: false
  });

  const API = "http://localhost:8080/api/tasks";

  const loadTasks = async () => {
    try {
      const result = await axios.get(API);
      setTasks(result.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const addTask = async () => {
    try {
      await axios.post(API, task);
      loadTasks();

      setTask({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        completed: false
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Task Manager</h2>

      <div className="card p-4">

        <input
          className="form-control mb-2"
          placeholder="Task Title"
          name="title"
          value={task.title}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />

        <select
          className="form-control mb-2"
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <input
          type="date"
          className="form-control mb-2"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          onClick={addTask}
        >
          Add Task
        </button>

      </div>

      <div className="mt-4">

        {tasks.map((t) => (
          <div
            key={t.id}
            className="card p-3 mb-3"
          >
            <h4>{t.title}</h4>

            <p>{t.description}</p>

            <p>
              Priority: <b>{t.priority}</b>
            </p>

            <p>
              Due: <b>{t.dueDate}</b>
            </p>

            <button
              className="btn btn-danger"
              onClick={() => deleteTask(t.id)}
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}

export default App;