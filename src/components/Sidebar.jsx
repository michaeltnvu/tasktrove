import { NavLink } from "react-router-dom";

const Sidebar = ({ projects, onProjectClick }) => {
  return (
    <div>
      <h3>Projects</h3>
      <ul>
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <NavLink onClick={() => onProjectClick(project)}>
                {project.description}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
