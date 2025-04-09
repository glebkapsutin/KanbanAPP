// Указываем базовый URL для API
const BaseUrl = "http://localhost:5291/api";

// Функция для получения всех задач с сервера
export const fetchTasks = async (setTasks,projectId) => {
  try {
    const response = await fetch(`${BaseUrl}/Task/projects/${projectId}/tasks`, {method: 'GET'}); // Запрашиваем задачи с сервера
    if (response.ok) {
      const data = await response.json(); // Получаем данные из ответа сервера
      setTasks(data); // Сохраняем задачи в состоянии
    } else {
      console.error("Ошибка при получении задач:", response.statusText);
    }
  } catch (error) {
    console.error("Ошибка при получении задач:", error); // Выводим ошибку, если запрос не удался
  }
};
export const updateStatusTask = async (taskId, newStatus) => {
  try {
    const response = await fetch(`${BaseUrl}/Task/update-status/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStatus),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении статуса задачи');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Ошибка при обновлении статуса задачи:', error);
    return null;
  }
};
// Функция для добавления новой задачи на сервер
// TaskApi.js
export const addTask = async (newTask, tasks, setTasks) => {
  try {
    const taskData = {
      taskName: newTask.taskName,
      description: newTask.description,
      status: newTask.status,
      priority: newTask.priority,
      deadline: newTask.deadline,
      projectId: newTask.projectId,
      userId: newTask.userId || 1, // Используем переданный userId или 1 по умолчанию
      assigneeName: newTask.assigneeName || 'Не назначен', // Добавляем имя исполнителя
      createdTask: new Date().toISOString()
    };

    const response = await fetch(`${BaseUrl}/Task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.title || 'Ошибка при добавлении задачи');
    }

    const addedTask = await response.json();
    setTasks([...tasks, addedTask]);
    return addedTask;
  } catch (error) {
    console.error('Ошибка при добавлении задачи:', error);
    throw error;
  }
};
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${BaseUrl}/Task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Ошибка при удалении задачи: ${response.status}`);
    }

    return true; // Возвращаем успех
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
    throw error;
  }
};
export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await fetch(`${BaseUrl}/Task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
      throw new Error(`Ошибка при обновлении задачи: ${response.status}`);
    }

    return true; // Возвращаем успех
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
    throw error;
  }
};