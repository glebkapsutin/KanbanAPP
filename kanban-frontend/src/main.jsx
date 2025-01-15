import { StrictMode } from 'react'; // Импортируем StrictMode из библиотеки React
import { createRoot } from 'react-dom/client'; // Импортируем createRoot для рендеринга React-компонентов
import './styles/index.css'; // Импортируем глобальные стили для приложения
import App from './App'; // Импортируем основной компонент приложения

// Инициализация корневого элемента приложения в DOM
createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <App />  {/* Рендерим компонент App внутри StrictMode */}
  </StrictMode>
);
