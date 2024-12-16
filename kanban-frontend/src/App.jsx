import React, { useState, useEffect } from 'react';
import './styles/App.css';
import MainContent from './scripts/MainContent';
import { fetchTasks, addTask } from './api/TaskApi';
import Footer from './scripts/Footer';
import Header from './scripts/Header';
import RegistrationWindow from './components/RegistrationWindow';
import LoginWindow from './components/LoginWindow';
import { fetchUsers } from './api/UserApi';
import { fetchProjects } from './api/ProjectApi';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [user, setUser] = useState(null);

  const handleAddTask = (newTask) => {
    if (!selectedProject) {
      alert('Пожалуйста, выберите проект перед добавлением задачи!');
      return;
    }
    newTask.projectId = selectedProject;
    console.log('Добавляем задачу с данными:', newTask);
    addTask(newTask, tasks, setTasks);
  };

  useEffect(() => {
    if (user && selectedProject) {
      
      fetchTasks(setTasks, selectedProject);

    }
  }, [user, selectedProject]);

  // Функция для успешного входа и загрузки данных пользователя
  const handleLoginSuccess = async (userData) => {
    console.log('Полученные данные пользователя после входа:', userData); // Отладочный вывод
  
    try {
      const userProfile = await fetchUsers(userData.id);
      console.log('Загруженный профиль пользователя:', userProfile); // Проверка полученного профиля
  
      if (userProfile) {
        setUser(userProfile); // Устанавливаем пользователя в состояние
      } else {
        setUser(userData); // Если профиль не загружен, используем базовые данные
      }
    } catch (error) {
      console.error('Ошибка при загрузке профиля пользователя:', error);
      setUser(userData);
    }
  
    setIsLoginFormVisible(false); // Закрываем окно входа
  };
  

  return (
    <div className={isRegisterFormVisible || isLoginFormVisible ? 'blurred-background' : ''}>
      <Header
        onRegisterClick={() => setIsRegisterFormVisible(true)}
        onLoginClick={() => setIsLoginFormVisible(true)}
        user={user}
      />
      <MainContent
        tasks={tasks}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        handleAddTask={handleAddTask}
      />
      <Footer />

      {/* Окно регистрации */}
      {isRegisterFormVisible && (
        <RegistrationWindow onClose={() => setIsRegisterFormVisible(false)} />
      )}

      {/* Окно входа */}
      {isLoginFormVisible && (
        <LoginWindow
          onClose={() => setIsLoginFormVisible(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default App;
