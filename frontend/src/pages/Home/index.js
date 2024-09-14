import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import api from "../../components/utils/api";
import TasksGrid from "./components/TasksGrid";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState();

  const getTasks = async () => {
    try {
      const { data } = await api.get("https://taskmanageapp.onrender.com/api/tasks");
      setTasks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = JSON.parse(
      localStorage.getItem("mern-task-management/user")
    )?.accessToken;
    setUsername(jwt_decode(token)?.username);
    getTasks();
  }, [navigate]);

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 15) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h3>{getGreeting()}, {username}</h3>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/new_task")}
        >
          Add Task
        </button>
      </div>
      <div>
        <p className="text-dark-2">
          Here are your tasks for today. Best of luck!
        </p>
        <TasksGrid tasks={tasks} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
