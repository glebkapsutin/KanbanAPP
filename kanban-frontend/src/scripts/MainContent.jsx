import React from "react";
import Projects from "../components/Projects";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import KanbanBoard from "../components/KanbanBoard";


const MainContent = ({
    
    tasks,
    selectedProject,
    setSelectedProject,
    handleAddTask,
    showProjects,
    showTasks,
    setTasks,
    
  }) => {
    return (
      <main>
        {/* Если форма регистрации видна, отображаем ее */}
       
  
        {showProjects && (
          <Projects
            onSelectProject={setSelectedProject}
            selectedProject={selectedProject}
          />
         )}
  
        {/* Задачи выбранного проекта */}
        {selectedProject && showTasks && (
          <div>
            
            <TaskForm
            onAddTask={handleAddTask}
            selectedProject={selectedProject}
            />
            <TaskList
              tasks={tasks.filter((task) => task.projectId === selectedProject)}  //закомменти что- то из TaskList или KanbanBoard,  смотря что ты хочешь отобразить
            />
            <KanbanBoard tasks={tasks} setTasks={setTasks} />
          </div>
        )}
      </main>
    );
  };
  
  export default MainContent;