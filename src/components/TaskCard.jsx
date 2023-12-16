import { useState } from "react";

const TaskCard = ({ task, onStatusChange }) => {
  const [status, setStatus] = useState(task.status);
  const origDate = task.dueDate.split("-");
  const reformattedDate = origDate.slice(1).concat(origDate[0]).join("-");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(task.id, newStatus);
  };

  return (
    <div>
      <h4>{task.title}</h4>
      <h5>{task.description}</h5>
      <ul>
        <li>assigned to: {task.assignee}</li>
        <li>priority: {task.priority}</li>
        <li>due by: {reformattedDate}</li>
      </ul>
      <div className="status-edit">
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="To-Do">To-Do</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button>Delete</button>
    </div>
  );
};

export default TaskCard;
