import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Toast, ToastContainer } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskContainer from "../components/TaskContainer";
import AddTaskModal from "../components/modal/AddTaskModal";
import EditProjectModal from "../components/modal/EditProjectModal";
import { MOCK_API_URL } from "../services/MOCK_API_URL";

const TaskTrove = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [show, setShow] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toasts, setToasts] = useState([]);

  // New Project Modal Toggle
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Edit Project Modal Toggle
  const handleEditProjectShow = () => setEditProjectModal(true);
  const handleEditProjectClose = () => setEditProjectModal(false);

  // New Task Modal Toggle
  const handleAddTaskShow = () => setAddTaskModal(true);
  const handleAddTaskClose = () => setAddTaskModal(false);

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

  const handleTaskDrop = (taskId, newStatus) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTaskList(updatedTaskList);

    const currentStatus = taskList.find((task) => task.id === taskId)?.status;

    if (currentStatus !== newStatus) {
      axios
        .put(`${MOCK_API_URL}/tasks/${taskId}`, {
          ...taskList.find((task) => task.id === taskId),
          status: newStatus,
        })
        .then((res) => {
          console.log("Status updated successfully!");
          setToasts([
            ...toasts,
            {
              id: new Date().getTime(),
              message: "Task updated successfully!",
            },
          ]);

          setTimeout(() => {
            setToasts((prevToasts) => prevToasts.slice(1));
          }, 2000);
        })
        .catch((err) => {
          console.log("Error updating task status: ", err);
          setTaskList(taskList);
        });
    }
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
    <DndProvider backend={HTML5Backend}>
      <div className="d-flex flex-column min-vh-100">
        <Header activeProject={selectedProject} handleShow={handleShow} />
        <Sidebar
          projects={projects}
          onProjectClick={handleProjectClick}
          onDeleteProject={handleDeleteProject}
          activeProject={selectedProject}
          handleAddTaskShow={handleAddTaskShow}
          onSubmit={handleAddProject}
          show={show}
          handleClose={handleClose}
          handleEditProjectShow={handleEditProjectShow}
        />

        <Container>
          <div className="row align-items-start">
            <TaskContainer
              title="To-Do"
              list={toDoList}
              onStatusChange={handleTaskStatusChange}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onTaskDrop={handleTaskDrop}
            />
            <TaskContainer
              title="In-Progress"
              list={inProgressList}
              onStatusChange={handleTaskStatusChange}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onTaskDrop={handleTaskDrop}
            />
            <TaskContainer
              title="Completed"
              list={completedList}
              onStatusChange={handleTaskStatusChange}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onTaskDrop={handleTaskDrop}
            />
          </div>
        </Container>
        <Footer />

        <AddTaskModal
          onSubmit={handleAddTask}
          addTaskModal={addTaskModal}
          handleAddTaskClose={handleAddTaskClose}
        />
        <EditProjectModal
          onSubmit={handleEditProject}
          project={selectedProject}
          handleEditProjectClose={handleEditProjectClose}
          show={editProjectModal}
        />
        <ToastContainer className="position-static">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              bg="success"
              show={true}
              onClose={() => setToasts((prevToasts) => prevToasts.slice(1))}
              delay={2000}
              autohide
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                zIndex: 1050,
                color: "white",
                fontWeight: "bold",
                animation: "floatUp 3s ease-in-out",
              }}
            >
              <Toast.Header>
                <strong className="me-auto">Task Updated!</strong>
              </Toast.Header>
              <Toast.Body>Your task has been successfully updated!</Toast.Body>
            </Toast>
          ))}
        </ToastContainer>
      </div>
    </DndProvider>
  );
};

export default TaskTrove;
