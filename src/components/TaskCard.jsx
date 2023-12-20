import { useState } from "react";
import EditTaskModal from "../components/modal/EditTaskModal";

const TaskCard = ({ task, onStatusChange, onDeleteTask, onEditTask }) => {
  const [status, setStatus] = useState(task.status);
  const [editMode, setEditMode] = useState(false);

  const origDate = task.dueDate.split("-");
  const reformattedDate = origDate.slice(1).concat(origDate[0]).join("-");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(task.id, newStatus);
  };

  const handleEdit = () => setEditMode(true);
  const handleCancelEdit = () => setEditMode(false);

  return (
    <div className="card mb-3">
      <h4 className="card-header">{task.title}</h4>
      <div className="card-body">
        <h5>{task.description}</h5>
        <ul>
          <li>points: {task.points}</li>
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
        {editMode ? (
          <EditTaskModal
            isOpen={editMode}
            onClose={handleCancelEdit}
            onUpdateTask={onEditTask}
            task={task}
          />
        ) : (
          <div className="mt-2">
            <div className="text-center">
              <button className="btn btn-secondary me-2" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
