import { useEffect, useState } from "react";

const EditTaskModal = ({ isOpen, onClose, onUpdateTask, task }) => {
  const [editedTask, setEditedTask] = useState({
    ...task,
    points: task?.points || "0",
  });

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
    onUpdateTask(editedTask);
    onClose();
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <form>
        <label>
          Task Title:
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Points:
          <select
            name="points"
            value={editedTask.points}
            onChange={handleInputChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </label>
        <label>
          Assignee:
          <input
            type="text"
            name="assignee"
            value={editedTask.assignee}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Priority:
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleUpdate}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTaskModal;
