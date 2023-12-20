import { useEffect, useState } from "react";

const EditProjectModal = ({ isOpen, onClose, onSubmit, project }) => {
  const [editedProject, setEditedProject] = useState({
    ...project,
    title: project?.title || "",
    description: project?.description || "",
  });

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
    onSubmit(editedProject);
    onClose();
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <form>
        <label>
          Project Title:
          <input
            type="text"
            name="title"
            value={editedProject.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={editedProject.description}
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

export default EditProjectModal;
