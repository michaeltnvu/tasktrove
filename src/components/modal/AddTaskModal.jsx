import { useState } from "react";

const AddTaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    points: "0",
    assignee: "",
    status: "To-Do",
    priority: "Medium",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newTask);
    setNewTask({
      title: "",
      description: "",
      points: "0",
      assignee: "",
      status: "To-Do",
      priority: "Medium",
      dueDate: "",
    });
    onClose();
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <form onSubmit={handleSubmit}>
        <label>
          Task Title:
          <input
            type="text"
            value={newTask.title}
            required
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newTask.description}
            required
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </label>
        <label>
          Points:
          <select
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
          </select>
        </label>
        <label>
          Assignee:
          <input
            type="text"
            value={newTask.assignee}
            required
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, assignee: e.target.value }))
            }
          />
        </label>
        <label>
          Status:
          <select
            value={newTask.status}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="To-Do">To-Do</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Priority:
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, priority: e.target.value }))
            }
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
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))
            }
          />
        </label>
        <button type="submit">Add Task</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTaskModal;
