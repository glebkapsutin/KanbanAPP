import React from 'react';

const ProjectList = ({ projects, onSelectProject, selectedProject }) => {
  return (
    <div>
      <h2>Список проектов</h2>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id} // Уникальный ключ для каждого проекта
            style={{
              cursor: 'pointer',
              fontWeight: selectedProject === project.id ? 'bold' : 'normal',
            }}
            onClick={() => onSelectProject(project.id)} // Выбор проекта
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
