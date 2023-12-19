import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  projects,
  onProjectClick,
  handleNewProjectClick,
  handleNewTaskClick,
  activeProject,
  onDeleteProject,
  onEditProject,
}) => {
  return (
    <div>
      <h3>Projects</h3>
      <button onClick={handleNewProjectClick}>Add project</button>
      <ul>
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
      </ul>
    </div>
  );
};

export default Sidebar;
