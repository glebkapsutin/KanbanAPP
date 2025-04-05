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

    return await response.json(); // Возвращаем обновлённую задачу
  } catch (error) {
    console.error('Ошибка при обновлении статуса задачи:', error);
    return null;
  }
};
// Функция для добавления новой задачи на сервер
// TaskApi.js
export const addTask = async (newTask, tasks, setTasks) => {
  try {
      const response = await fetch(`${BaseUrl}/Task`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newTask)
      });
      if (response.ok) {
          const addedTask = await response.json();
          setTasks([...tasks, addedTask]); // Добавляем новую задачу в состояние
      } else {
          console.error("Ошибка при добавлении задачи:", await response.text());
      }
  } catch (error) {
      console.error("Ошибка сети:", error);
  }
};
export const deleteTask = async(tasks,setTasks) =>{
  const response = await fetch(`${BaseUrl}/Task`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },

  });

}