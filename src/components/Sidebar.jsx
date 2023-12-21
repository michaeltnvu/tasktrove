import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import AddProjectModal from "./modal/AddProjectModal";

const Sidebar = ({
  projects,
  onProjectClick,
  handleAddTaskShow,
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
      <Offcanvas.Body style={{ backgroundColor: "#f5f5f5" }}>
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
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
