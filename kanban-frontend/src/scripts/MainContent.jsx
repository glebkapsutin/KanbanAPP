import React from "react";
import Projects from "../components/Projects";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const MainContent = ({
    
    tasks,
    selectedProject,
    setSelectedProject,
    handleAddTask,
  }) => {
    return (
      <main>
        {/* Если форма регистрации видна, отображаем ее */}
       
  
        {/* Список проектов */}
        <Projects
          onSelectProject={setSelectedProject}
          selectedProject={selectedProject}
        />
  
        {/* Задачи выбранного проекта */}
        {selectedProject && (
          <div>
            
            <TaskForm
              onAddTask={handleAddTask}
              selectedProject={selectedProject}
            />
            <TaskList
              tasks={tasks.filter((task) => task.projectId === selectedProject)}
            />
          </div>
        )}
      </main>
    );
  };
  
  export default MainContent;