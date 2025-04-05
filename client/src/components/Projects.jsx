import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList'; // Импортируем компонент списка проектов
import ProjectForm from './ProjectForm'; // Импортируем компонент формы для добавления новых проектов
import { fetchProjects, addProject } from '../api/ProjectApi'; // Импортируем API-функции для работы с проектами

const Projects = ({ onSelectProject, selectedProject }) => {
    // Состояние для хранения списка проектов
    const [projects, setProjects] = useState([]);
  
    // Хук useEffect для загрузки проектов при монтировании компонента
    useEffect(() => {
      fetchProjects(setProjects); // Загружаем проекты при монтировании компонента
    }, []);

    // Обработчик добавления нового проекта
    const handleAddProject = async (newProject) => {
        // Вызов API для добавления нового проекта и обновления состояния
        await addProject(newProject, projects, setProjects);
    };

    return (
        <div>
            <center>
                {/* Компонент формы для добавления проекта */}
                <ProjectForm onAddProject={handleAddProject} />
                {/* Компонент для отображения списка проектов */}
                <ProjectList
                    projects={projects} // Передаем список проектов
                    onSelectProject={onSelectProject} // Передаем обработчик для выбора проекта
                    selectedProject={selectedProject} // Передаем выбранный проект
                />
            </center>
        </div>
    );
};

export default Projects;
