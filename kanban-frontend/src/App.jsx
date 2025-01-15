import React, { useState, useEffect } from 'react'; // Импортируем React и хуки useState, useEffect
import './styles/App.css'; // Стили приложения
import MainContent from './scripts/MainContent'; // Основной контент приложения
import { fetchTasks, addTask } from './api/TaskApi'; // API для работы с задачами
import Footer from './scripts/Footer'; // Нижний колонтитул
import Header from './scripts/Header'; // Заголовок с кнопками
import RegistrationWindow from './components/RegistrationWindow'; // Окно регистрации
import LoginWindow from './components/LoginWindow'; // Окно входа
import { fetchUsers } from './api/UserApi'; // API для работы с пользователями
import { fetchProjects } from './api/ProjectApi'; // API для работы с проектами

// Основной компонент приложения
const App = () => {
  // Состояния для управления данными и видимостью компонентов
  const [tasks, setTasks] = useState([]); // Состояние для хранения задач
  const [selectedProject, setSelectedProject] = useState(null); // Выбранный проект
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false); // Видимость формы регистрации
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false); // Видимость формы входа
  const [user, setUser] = useState(null); // Данные пользователя
  const [showProjects, setShowProjects] = useState(false); // Видимость списка проектов
  const [showTasks, setShowTasks] = useState(false); // Видимость задач для выбранного проекта

  // Функция для добавления задачи
  const handleAddTask = (newTask) => {
    if (!selectedProject) {
      alert('Пожалуйста, выберите проект перед добавлением задачи!');
      return;
    }
    newTask.projectId = selectedProject; // Привязываем задачу к выбранному проекту
    console.log('Добавляем задачу с данными:', newTask);
    addTask(newTask, tasks, setTasks); // Добавляем задачу в API и обновляем состояние задач
  };

  // Функции для управления видимостью проектов и задач
  const handleProjectsClick = () => {
    setShowProjects(true); // Отображаем проекты
    setShowTasks(false); // Скрываем задачи
    console.log('Перейти к проектам');
  };

  const handleTasksClick = () => {
    setShowProjects(true); // Отображаем проекты
    setShowTasks(true); // Отображаем задачи
    console.log('Перейти к задачам');
  };

  // Эффект для загрузки задач при изменении пользователя или выбранного проекта
  useEffect(() => {
    if (user && selectedProject) {
      fetchTasks(setTasks, selectedProject); // Загружаем задачи для выбранного проекта
    }
  }, [user, selectedProject]); // Хук с зависимостями (user и selectedProject)

  // Функция для успешного входа и загрузки данных пользователя
  const handleLoginSuccess = async (userData) => {
    console.log('Полученные данные пользователя после входа:', userData); // Отладочный вывод

    try {
      const userProfile = await fetchUsers(userData.id); // Загружаем профиль пользователя
      console.log('Загруженный профиль пользователя:', userProfile); // Проверка полученного профиля

      if (userProfile) {
        setUser(userProfile); // Устанавливаем данные пользователя в состояние
      } else {
        setUser(userData); // Если профиль не загружен, используем данные пользователя
      }
    } catch (error) {
      console.error('Ошибка при загрузке профиля пользователя:', error);
      setUser(userData); // Если ошибка, просто используем переданные данные
    }

    setIsLoginFormVisible(false); // Закрываем окно входа
  };

  return (
    <div className="app-container">
      {/* Заголовок приложения */}
      <Header
        onRegisterClick={() => setIsRegisterFormVisible(true)} // Открытие окна регистрации
        onLoginClick={() => setIsLoginFormVisible(true)} // Открытие окна входа
        user={user} // Данные о пользователе
        OnProjectsClick={handleProjectsClick} // Обработчик клика на проекты
        OnTasksClick={handleTasksClick} // Обработчик клика на задачи
      />
      {/* Основной контент приложения, передаем необходимые пропсы */}
      <MainContent
        tasks={tasks}
        setTasks={setTasks}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        handleAddTask={handleAddTask}
        showProjects={showProjects}
        showTasks={showTasks}
      />
      {/* Нижний колонтитул */}
      <Footer />

      {/* Окно регистрации */}
      {isRegisterFormVisible && (
        <RegistrationWindow onClose={() => setIsRegisterFormVisible(false)} />
      )}

      {/* Окно входа */}
      {isLoginFormVisible && (
        <LoginWindow
          onClose={() => setIsLoginFormVisible(false)} // Закрытие окна входа
          onLoginSuccess={handleLoginSuccess} // Обработчик успешного входа
        />
      )}
    </div>
  );
};

export default App; // Экспортируем компонент
