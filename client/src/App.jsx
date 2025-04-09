import React, { useState, useEffect } from 'react'; // Импортируем React и хуки useState, useEffect
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, IconButton, Snackbar, Alert, useMediaQuery } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import MainContent from './scripts/MainContent'; // Основной контент приложения
import { fetchTasks, addTask } from './api/TaskApi'; // API для работы с задачами
import Footer from './scripts/Footer'; // Нижний колонтитул
import Header from './scripts/Header'; // Заголовок с кнопками
import RegisterForm from './components/RegisterForm'; // Окно регистрации
import LoginForm from './components/LoginForm'; // Окно входа
import Features from './components/Features'; // Страница возможностей
import { fetchUsers } from './api/UserApi'; // API для работы с пользователями
import { fetchProjects } from './api/ProjectApi'; // API для работы с проектами

// Основной компонент приложения
const App = () => {
  const navigate = useNavigate();
  // Состояния для управления данными и видимостью компонентов
  const [tasks, setTasks] = useState([]); // Состояние для хранения задач
  const [selectedProject, setSelectedProject] = useState(null); // Выбранный проект
  const [user, setUser] = useState(null); // Данные пользователя
  const [showProjects, setShowProjects] = useState(false); // Видимость списка проектов
  const [showTasks, setShowTasks] = useState(false); // Видимость задач для выбранного проекта
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#2196F3',
          },
          secondary: {
            main: '#FF4081',
          },
          background: {
            default: darkMode ? '#121212' : '#F5F5F5',
            paper: darkMode ? '#1E1E1E' : '#FFFFFF',
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Функция для добавления задачи
  const handleAddTask = (newTask) => {
    if (!selectedProject) {
      showNotification('Пожалуйста, выберите проект перед добавлением задачи!', 'warning');
      return;
    }
    newTask.projectId = selectedProject; // Привязываем задачу к выбранному проекту
    console.log('Добавляем задачу с данными:', newTask);
    addTask(newTask, tasks, setTasks)
      .then(() => {
        showNotification('Задача успешно добавлена!', 'success');
      })
      .catch((error) => {
        showNotification('Ошибка при добавлении задачи: ' + error.message, 'error');
      });
  };

  // Функции для управления видимостью проектов и задач
  const handleProjectsClick = () => {
    setShowProjects(true);
    setShowTasks(false);
    navigate('/');
    console.log('Перейти к проектам');
  };

  const handleTasksClick = () => {
    setShowProjects(true);
    setShowTasks(true);
    navigate('/');
    console.log('Перейти к задачам');
  };

  const handleFeaturesClick = () => {
    setShowProjects(false);
    setShowTasks(false);
    navigate('/features');
    console.log('Перейти к возможностям');
  };

  // Эффект для загрузки задач при изменении пользователя или выбранного проекта
  useEffect(() => {
    if (user && selectedProject) {
      fetchTasks(setTasks, selectedProject)
        .catch((error) => {
          showNotification('Ошибка при загрузке задач: ' + error.message, 'error');
        });
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
        showNotification(`Добро пожаловать, ${userProfile.name}!`, 'success');
      } else {
        setUser(userData); // Если профиль не загружен, используем данные пользователя
        showNotification(`Добро пожаловать!`, 'success');
      }
    } catch (error) {
      console.error('Ошибка при загрузке профиля пользователя:', error);
      setUser(userData); // Если ошибка, просто используем переданные данные
      showNotification('Не удалось загрузить полный профиль', 'warning');
    }
  };

  const handleRegisterSuccess = (data) => {
    showNotification('Регистрация успешна! Теперь вы можете войти в систему.', 'success');
    // Используем navigate вместо window.location.href
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        className={`min-h-screen flex flex-col ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}
      >
        <Box className="fixed top-4 right-4 z-50">
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
            className="bg-opacity-20 backdrop-blur-sm bg-gray-200 dark:bg-gray-800"
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        <Header
          user={user} // Данные о пользователе
          OnProjectsClick={handleProjectsClick} // Обработчик клика на проекты
          OnTasksClick={handleTasksClick} // Обработчик клика на задачи
          OnFeaturesClick={handleFeaturesClick} // Обработчик клика на возможности
        />
        
        <Box component="main" className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route
              path="/"
              element={
                <MainContent
                  tasks={tasks}
                  setTasks={setTasks}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                  handleAddTask={handleAddTask}
                  showProjects={showProjects}
                  showTasks={showTasks}
                  showNotification={showNotification}
                />
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Box className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                  </Box>
                )
              }
            />
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Box className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                    <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
                  </Box>
                )
              }
            />
            <Route
              path="/features"
              element={<Features />}
            />
          </Routes>
        </Box>

        <Footer />

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            variant="filled"
            elevation={6}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default App; // Экспортируем компонент
