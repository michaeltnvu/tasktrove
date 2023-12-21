import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";

const EditTaskModal = ({ show, handleClose, onUpdateTask, task }) => {
  const [editedTask, setEditedTask] = useState({
    ...task,
    points: task?.points || "5",
  });
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showInputAlert, setShowInputAlert] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (isFormValid()) {
      setShowInputAlert(false);
      if (editedTask.dueDate < currentDate) {
        setShowAlert(true);
        return;
      }
      onUpdateTask(editedTask);
      setShowToast(true);
      handleClose();
    } else {
      setShowInputAlert(true);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setShowAlert(false);
    setShowInputAlert(false);
  };

  const isFormValid = () => {
    return (
      editedTask.title.trim() !== "" &&
      editedTask.description.trim() !== "" &&
      editedTask.assignee.trim() !== ""
    );
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
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
                name="title"
                type="text"
                value={editedTask.title}
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskDescription">Description</Form.Label>
              <Form.Control
                id="taskDescription"
                name="description"
                type="text"
                value={editedTask.description}
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskPoints">Points</Form.Label>
              <Form.Select
                id="taskPoints"
                name="points"
                value={editedTask.points}
                onChange={handleInputChange}
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
                name="assignee"
                type="text"
                value={editedTask.assignee}
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="taskStatus">Status</Form.Label>
              <Form.Select
                id="taskStatus"
                name="status"
                value={editedTask.status}
                onChange={handleInputChange}
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
                name="priority"
                value={editedTask.priority}
                onChange={handleInputChange}
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
                name="dueDate"
                type="date"
                value={editedTask.dueDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="toast-container">
        <Toast
          bg="success"
          show={showToast}
          onClose={handleCloseToast}
          delay={2000}
          autohide
          className="toast-float-up"
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
            <strong className="me-auto">TASK UPDATED!</strong>
          </Toast.Header>
          <Toast.Body>Your task has been successfully updated!</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default EditTaskModal;
