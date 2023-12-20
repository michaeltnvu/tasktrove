import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskContainer from "../components/TaskContainer";
import AddTaskModal from "../components/modal/AddTaskModal";
import EditProjectModal from "../components/modal/EditProjectModal";
import { MOCK_API_URL } from "../services/MOCK_API_URL";

const TaskTrove = () => {
  const [editProjectModalToggle, setEditProjectModalToggle] = useState(false);
  const [taskModalToggle, setTaskModalToggle] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const toDoList = taskList.filter((task) => task.status === "To-Do");
  const inProgressList = taskList.filter(
    (task) => task.status === "In-Progress"
  );
  const completedList = taskList.filter((task) => task.status === "Completed");

  const generateUniqueId = () =>
    Math.random().toString(36).slice(2, 11) + Date.now().toString(36);

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

  const handleAddProject = ({ title, description }) => {
    const newProject = {
      id: generateUniqueId(),
      title,
      description,
    };

    axios
      .post(`${MOCK_API_URL}/projects`, newProject)
      .then((res) => console.log("Project added successfuly!"))
      .catch((err) => console.log(err));

    setProjects([...projects, newProject]);
  };

  const handleEditProjectClick = () => setEditProjectModalToggle(true);

  const handleEditProject = (updatedProject) => {
    axios
      .put(`${MOCK_API_URL}/projects/${updatedProject.id}`, updatedProject)
      .then((res) => {
        console.log("Project updated successfully!");
        const updatedProjects = projects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        );
        setProjects(updatedProjects);
        setSelectedProject(updatedProject);
      })
      .catch((err) => console.log(err));
    setEditProjectModalToggle(false);
  };

  const handleDeleteProject = (projectId) => {
    axios
      .delete(`${MOCK_API_URL}/projects/${projectId}`)
      .then((res) => {
        console.log("Project deleted successfully!");
        setProjects(projects.filter((project) => project.id !== projectId));
        setTaskList(taskList.filter((task) => task.projectId !== projectId));
      })
      .catch((err) => console.log(err));
  };

  const handleAddTask = ({
    title,
    description,
    points,
    assignee,
    status,
    priority,
    dueDate,
  }) => {
    const newTask = {
      id: generateUniqueId(),
      projectId: selectedProject.id,
      title,
      description,
      points,
      assignee,
      status,
      priority,
      createdDate: new Date().toISOString().split("T")[0],
      dueDate,
    };

    axios
      .post(`${MOCK_API_URL}/tasks`, newTask)
      .then((res) => console.log("Task added successfully!"))
      .catch((err) => console.log(err));

    setTaskList([...taskList, newTask]);
  };

  const handleEditTask = (updatedTask) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    setTaskList(updatedTaskList);
    axios
      .put(`${MOCK_API_URL}/tasks/${updatedTask.id}`, updatedTask)
      .then((res) => console.log("Task updated successfully!"))
      .catch((err) => console.log(err));
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`${MOCK_API_URL}/tasks/${taskId}`)
      .then((res) => {
        console.log("Task deleted successfully");
        setTaskList(taskList.filter((task) => task.id !== taskId));
      })
      .catch((err) => console.log(err));
  };

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
      <Header activeProject={selectedProject} />
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        projects={projects}
        onProjectClick={handleProjectClick}
        onDeleteProject={handleDeleteProject}
        activeProject={selectedProject}
        handleNewTaskClick={() => setTaskModalToggle(true)}
        onEditProject={handleEditProjectClick}
        onSubmit={handleAddProject}
      />

      <div className="container">
        <div className="row align-items-start">
          <TaskContainer
            title="To-Do"
            list={toDoList}
            onStatusChange={handleTaskStatusChange}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
          <TaskContainer
            title="In-Progress"
            list={inProgressList}
            onStatusChange={handleTaskStatusChange}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
          <TaskContainer
            title="Completed"
            list={completedList}
            onStatusChange={handleTaskStatusChange}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
      </div>
      <Footer />

      <AddTaskModal
        isOpen={taskModalToggle}
        onClose={() => setTaskModalToggle(false)}
        onSubmit={handleAddTask}
      />
      <EditProjectModal
        isOpen={editProjectModalToggle}
        onClose={() => setEditProjectModalToggle(false)}
        onSubmit={handleEditProject}
        project={selectedProject}
      />
    </div>
  );
};

export default TaskTrove;
