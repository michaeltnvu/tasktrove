import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import AddProjectModal from "./modal/AddProjectModal";

const Sidebar = ({
  projects,
  onProjectClick,
  handleAddTaskShow,
  activeProject,
  onDeleteProject,
  onSubmit,
  show,
  handleClose,
  handleEditProjectShow,
}) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <AddProjectModal onSubmit={onSubmit} />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Accordion defaultActiveKey="0">
          {projects.map((project) => (
            <Accordion.Item key={project.id} eventKey={project.id.toString()}>
              <Accordion.Header onClick={() => onProjectClick(project)}>
                {project.title}
              </Accordion.Header>
              <Accordion.Body>
                {project.description && <div>{project.description}</div>}
                <div className="d-flex mt-4">
                  <Button variant="success" onClick={handleAddTaskShow}>
                    Add Task
                  </Button>
                  <Button
                    className="mx-2"
                    variant="secondary"
                    onClick={handleEditProjectShow}
                  >
                    Edit Project
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDeleteProject(project.id)}
                  >
                    Delete Project
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        {/* <div>
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
                        <div className="d-flex">
                          <Button variant="success" onClick={handleAddTaskShow}>
                            Add Task
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={handleEditProjectShow}
                          >
                            Edit Project
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => onDeleteProject(project.id)}
                          >
                            Delete Project
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div> */}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
