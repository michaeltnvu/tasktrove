import { useState } from "react";

const AddProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <form onSubmit={handleSubmit}>
        <label>
          Project Title:
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Add Project</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProjectModal;
