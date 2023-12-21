import { useState } from "react";
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
    dueDate: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newTask);
    setShowToast(true);
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

  const handleCloseToast = () => setShowToast(false);

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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskTitle">Title</Form.Label>
              <Form.Control
                id="taskTitle"
                type="text"
                value={newTask.title}
                required
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskDescription">Description</Form.Label>
              <Form.Control
                id="taskDescription"
                type="text"
                value={newTask.description}
                required
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
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
                required
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, assignee: e.target.value }))
                }
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
        show={showToast}
        onClose={handleCloseToast}
        delay={3000}
        autohide
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1050 }}
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
