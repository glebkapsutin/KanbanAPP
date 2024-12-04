import React, { useState, useEffect } from 'react';
import './styles/App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import RegisterForm from './components/RegisterForm';
import { fetchTasks, addTask } from './api/TaskApi';
import Projects from './components/Projects'


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false); // Состояние для показа формы

  const handleAddTask = (newTask) => {
    if (!selectedProject) {
      alert('Пожалуйста, выберите проект перед добавлением задачи!');
      return;
    }
  
    newTask.projectId = selectedProject;
    console.log('Добавляем задачу с данными:', newTask); // Убедитесь, что ID проекта существует
    addTask(newTask, tasks, setTasks);
  };
  



  useEffect(() => {
    fetchTasks(setTasks);
  }, []);

  return (
    <div>

      <h1>Kanban</h1>

      {/* Кнопка для отображения/скрытия формы регистрации */}
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
        onClick={() => setIsRegisterFormVisible(!isRegisterFormVisible)} // Переключаем видимость формы
      >
        Зарегистрироваться
      </button>

      {/* Если форма регистрации видна, показываем ее */}
      {isRegisterFormVisible && <RegisterForm />}

      <Projects
        onSelectProject={setSelectedProject}
        selectedProject={selectedProject}
      />

      {selectedProject && (
        <div>
          <h2>{selectedProject.name}</h2>
          <TaskForm 
           onAddTask={handleAddTask}
           selectedProject={selectedProject} />
          <TaskList tasks={tasks.filter((task) => task.projectId === selectedProject)} />
        </div>
      )}
    </div>
  );
};

export default App;
