import React from 'react';

// Компонент для отображения списка проектов
const ProjectList = ({ projects, onSelectProject, selectedProject }) => {
  return (
    <div className='wrapper'>
      <div className='card'>
        {/* Заголовок списка проектов */}
        <h1>Список проектов</h1>
        <ul>
          {/* Перебираем список проектов и отображаем каждый */}
          {projects.map((project) => (
            <li
              key={project.id} // Уникальный ключ для каждого проекта, необходим для оптимизации
              style={{
                cursor: 'pointer', // Указываем, что элемент можно кликать
                fontWeight: selectedProject === project.id ? 'bold' : 'normal', // Выделяем выбранный проект
              }}
              onClick={() => onSelectProject(project.id)} // Вызываем onSelectProject при клике, передаем id проекта
            >
              {/* Название и описание проекта */}
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
