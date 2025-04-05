import { StrictMode } from 'react'; // Импортируем StrictMode из библиотеки React
import { createRoot } from 'react-dom/client'; // Импортируем createRoot для рендеринга React-компонентов
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'; // Импортируем глобальные стили для приложения
import App from './App'; // Импортируем основной компонент приложения

// Создаем тему Material UI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Инициализация корневого элемента приложения в DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />  {/* Рендерим компонент App внутри StrictMode */}
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
