import React from 'react';

const ProjectList = ({ projects, onSelectProject, selectedProject }) => {
  return (
    <div className='wrapper'>
    <div className='card'>
      
      <h1>Список проектов</h1>
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
            
            <h2>{project.name}</h2>
            <h3>{project.description}</h3>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ProjectList;
