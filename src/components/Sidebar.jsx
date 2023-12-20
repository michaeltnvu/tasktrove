import AddProjectModal from "./modal/AddProjectModal";

const Sidebar = ({
  projects,
  onProjectClick,
  handleNewTaskClick,
  activeProject,
  onDeleteProject,
  onEditProject,
  sidebar,
  setSidebar,
  onSubmit,
}) => {
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      data-bs-config={{ backdrop: true }}
    >
      <div className="d-grid gap-2 my-2 col-6 mx-auto">
        <AddProjectModal onSubmit={onSubmit} />
      </div>

      <ul className="list-group">
        {projects.map((project) => {
          const isActive = project === activeProject;
          return (
            <li
              key={project.id}
              className="list-group-item d-flex justify-content-between align-items-start"
              onClick={() => onProjectClick(project)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{project.title}</div>
                {isActive && (
                  <div>
                    {project.description}
                    <div>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleNewTaskClick}
                      >
                        Add Task
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary mx-1"
                        onClick={onEditProject}
                      >
                        Edit Project
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDeleteProject(project.id)}
                      >
                        Delete Project
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

{
  /* <ul>
              {projects.map((project) => {
                const isActive = project === activeProject;
                return (
                  <li key={project.id}>
                    <NavLink onClick={() => onProjectClick(project)}>
                      <h4>{project.title}</h4>
                    </NavLink>
                    {isActive && (
                      <div>
                        <p>{project.description}</p>
                        <button onClick={handleNewTaskClick}>Add Task</button>
                        <button onClick={onEditProject}>Edit Project</button>
                        <button onClick={() => onDeleteProject(project.id)}>
                          Delete Project
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul> */
}
