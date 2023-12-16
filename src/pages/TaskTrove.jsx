import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskContainer from "../components/TaskContainer";
import { MOCK_API_URL } from "../services/MOCK_API_URL";

const TaskTrove = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskList, setTaskList] = useState([]);

  const toDoList = taskList.filter((task) => task.status === "To-Do");
  const inProgressList = taskList.filter(
    (task) => task.status === "In-Progress"
  );
  const completedList = taskList.filter((task) => task.status === "Completed");

  useEffect(() => {
    axios
      .get(`${MOCK_API_URL}/projects`)
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleProjectClick = (project) => setSelectedProject(project);

  useEffect(() => {
    if (selectedProject) {
      axios
        .get(`${MOCK_API_URL}/projects/${selectedProject.id}/tasks`)
        .then((res) => setTaskList(res.data))
        .catch((err) => console.log(err));
    }
  }, [selectedProject]);

  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTaskList(updatedTaskList);
    const updatedTask = taskList.find((task) => task.id === taskId);
    axios
      .put(`${MOCK_API_URL}/tasks/${taskId}`, {
        ...updatedTask,
        status: newStatus,
      })
      .then((res) => console.log("Status updated successfully!"))
      .catch((err) => {
        console.log("Error updating task status: ", err);
        setTaskList(taskList);
      });
  };

  return (
    <div>
      <Navbar />
      <Sidebar projects={projects} onProjectClick={handleProjectClick} />
      <div className="kanban-board">
        <TaskContainer
          title="To-Do"
          list={toDoList}
          onStatusChange={handleTaskStatusChange}
        />
        <TaskContainer
          title="In-Progress"
          list={inProgressList}
          onStatusChange={handleTaskStatusChange}
        />
        <TaskContainer
          title="Completed"
          list={completedList}
          onStatusChange={handleTaskStatusChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TaskTrove;
