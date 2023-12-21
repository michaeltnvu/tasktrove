import { useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";

const AddTaskModal = ({ onSubmit, addTaskModal, handleAddTaskClose }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    points: "5",
    assignee: "",
    status: "To-Do",
    priority: "Medium",
    dueDate: new Date().toISOString().split("T")[0],
  });
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showInputAlert, setShowInputAlert] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setShowInputAlert(false);
      if (newTask.dueDate < currentDate) {
        setShowAlert(true);
        return;
      }
      onSubmit(newTask);
      setShowToast(true);
      setNewTask({
        title: "",
        description: "",
        points: "5",
        assignee: "",
        status: "To-Do",
        priority: "Medium",
        dueDate: new Date().toISOString().split("T")[0],
      });
      handleAddTaskClose();
    } else {
      setShowInputAlert(true);
    }
  };

  const handleCancel = () => {
    setNewTask({
      title: "",
      description: "",
      points: "5",
      assignee: "",
      status: "To-Do",
      priority: "Medium",
      dueDate: "",
    });
    handleAddTaskClose();
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setShowAlert(false);
    setShowInputAlert(false);
  };

  const isFormValid = () => {
    return (
      newTask.title.trim() !== "" &&
      newTask.description.trim() !== "" &&
      newTask.assignee.trim() !== ""
    );
  };

  return (
    <div>
      <Modal
        show={addTaskModal}
        onHide={handleAddTaskClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert variant="danger" className="text-center">
              We wish we could travel back in time, too. Try again.
            </Alert>
          )}
          {showInputAlert && (
            <Alert variant="danger" className="text-center">
              Please fill in all fields.
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskTitle">Title</Form.Label>
              <Form.Control
                id="taskTitle"
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskDescription">Description</Form.Label>
              <Form.Control
                id="taskDescription"
                type="text"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskPoints">Points</Form.Label>
              <Form.Select
                id="taskPoints"
                value={newTask.points}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, points: e.target.value }))
                }
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskAssignee">Assigned to</Form.Label>
              <Form.Control
                id="taskAssignee"
                type="text"
                value={newTask.assignee}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, assignee: e.target.value }))
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskStatus">Status</Form.Label>
              <Form.Select
                id="taskStatus"
                value={newTask.status}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="To-Do">To-Do</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskPriority">Priority</Form.Label>
              <Form.Select
                id="taskPriority"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, priority: e.target.value }))
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskDueDate">Due date</Form.Label>
              <Form.Control
                id="taskDueDate"
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast
        bg="success"
        show={showToast}
        onClose={handleCloseToast}
        delay={2000}
        autohide
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1050,
          color: "white",
          fontWeight: "bold",
          animation: "floatUp 3s ease-in-out",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">PROJECT CREATED!</strong>
        </Toast.Header>
        <Toast.Body>Your new project has been successfully created!</Toast.Body>
      </Toast>
    </div>
  );
};

export default AddTaskModal;
