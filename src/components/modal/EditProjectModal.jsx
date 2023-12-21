import { useEffect, useState } from "react";
import { Alert, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const EditProjectModal = ({
  show,
  onSubmit,
  project,
  handleEditProjectClose,
}) => {
  const [editedProject, setEditedProject] = useState({
    ...project,
    title: project?.title || "",
    description: project?.description || "",
  });
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (project) {
      setEditedProject({ ...project });
    }
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (isFormValid()) {
      setShowAlert(false);
      onSubmit(editedProject);
      setShowToast(true);
      handleEditProjectClose();
    } else {
      setShowAlert(true);
    }
  };

  const handleCancel = () => {
    setEditedProject({ ...project });
    handleEditProjectClose();
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setShowAlert(false);
  };

  const isFormValid = () => {
    return (
      editedProject.title.trim() !== "" &&
      editedProject.description.trim() !== ""
    );
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleEditProjectClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert variant="danger" className="text-center">
              Please fill in all fields.
            </Alert>
          )}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="projectTitle">Title</Form.Label>
              <Form.Control
                id="projectTitle"
                name="title"
                type="text"
                value={editedProject.title}
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="projectDescription">Description</Form.Label>
              <Form.Control
                id="projectDescription"
                name="description"
                type="text"
                value={editedProject.description}
                required
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
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
          <strong className="me-auto">PROJECT UPDATED!</strong>
        </Toast.Header>
        <Toast.Body>Your project has been successfully updated!</Toast.Body>
      </Toast>
    </div>
  );
};

export default EditProjectModal;
