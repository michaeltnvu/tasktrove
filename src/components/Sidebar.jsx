import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/esm/Col";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  projects,
  onProjectClick,
  handleNewProjectClick,
  handleNewTaskClick,
  activeProject,
  onDeleteProject,
  onEditProject,
  sidebar,
  setSidebar,
}) => {
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
      data-bs-config={{ backdrop: true }}
    >
      <div class="d-grid gap-2 my-2 col-6 mx-auto">
        <button
          class="btn btn-primary"
          type="button"
          onClick={handleNewProjectClick}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-clipboard2-plus"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z" />
            <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
            <path d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5z" />
          </svg>
          Add Project
        </button>
      </div>

      {/* <ul>
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
            </ul> */}
      <ul class="list-group">
        {projects.map((project) => {
          const isActive = project === activeProject;
          return (
            <>
              <li
                class="list-group-item d-flex justify-content-between align-items-start"
                key={project.id}
                onClick={() => onProjectClick(project)}
              >
                <div class="ms-2 me-auto">
                  <div class="fw-bold">{project.title}</div>
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
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
