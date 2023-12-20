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
    // <div style={{ display: isOpen ? "block" : "none" }}>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Project Title:
    //       <input
    //         type="text"
    //         value={title}
    //         required
    //         onChange={(e) => setTitle(e.target.value)}
    //       />
    //     </label>
    //     <label>
    //       Description:
    //       <input
    //         type="text"
    //         value={description}
    //         required
    //         onChange={(e) => setDescription(e.target.value)}
    //       />
    //     </label>
    //     <button type="submit">Add Project</button>
    //     <button type="button" onClick={handleCancel}>
    //       Cancel
    //     </button>
    //   </form>
    // </div>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Modal title
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
