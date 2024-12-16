const BaseUrl = "http://localhost:5291/api";

export const fetchUsers = async (userId) => {
  try {
    console.log(`Запрос к API для получения пользователя с ID: ${userId}`);
    const response = await fetch(`${BaseUrl}/Users/${userId}`, { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      console.log('Полученные данные пользователя из API:', data);
      return data; // Возвращаем данные пользователя
    } else {
      console.error("Ошибка при получении пользователя:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    return null;
  }
};
