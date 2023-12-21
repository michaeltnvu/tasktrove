import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import EditTaskModal from "../components/modal/EditTaskModal";

const TaskCard = ({ task, onStatusChange, onDeleteTask, onEditTask }) => {
  const [status, setStatus] = useState(task.status);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const origDate = task.dueDate.split("-");
  const reformattedDate = origDate.slice(1).concat(origDate[0]).join("-");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(task.id, newStatus);
  };

  return (
    <Card className="mb-2 me-2">
      <Card.Header>{task.title}</Card.Header>
      <Card.Body>
        <Card.Title>{task.description}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>{task.points} points</ListGroup.Item>
          <ListGroup.Item>assigned to: {task.assignee}</ListGroup.Item>
          <ListGroup.Item>priority: {task.priority}</ListGroup.Item>
          <ListGroup.Item>due by: {reformattedDate}</ListGroup.Item>
          <ListGroup.Item>
            status:
            <select
              className="ms-2"
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="To-Do">To-Do</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleShow}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDeleteTask(task.id)}>
          Delete
        </Button>
      </Card.Footer>
      <EditTaskModal
        show={show}
        handleClose={handleClose}
        onUpdateTask={onEditTask}
        task={task}
      />
    </Card>
  );
};

export default TaskCard;
