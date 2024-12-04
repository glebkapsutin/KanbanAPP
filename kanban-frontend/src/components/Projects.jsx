import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList'; // Список проектов
import ProjectForm from './ProjectForm'; // Форма для добавления новых проектов
import { fetchProjects, addProject } from '../api/ProjectApi'


const Projects = ({ onSelectProject, selectedProject }) => {
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      fetchProjects(setProjects); // Загружаем проекты при монтировании компонента
    }, []);

    const  handleAddProject = async(newProject)=>{

        await addProject(newProject,projects,setProjects)
    };
    return(
        <div >
            <center>
                <ProjectForm onAddProject={handleAddProject}/>
                <ProjectList
                    projects={projects}
                    onSelectProject={onSelectProject} 
                    selectedProject={selectedProject}
                />
            </center>
            
        </div>
    );
};
export default Projects;