const BaseUrl = "http://localhost:5291/api";

export const fetchProjects = async (setProjects) => {
  try {
    const response = await fetch(`${BaseUrl}/Project`, {method: 'GET'}); 
    if (response.ok) {
      const data = await response.json(); 
      setProjects(data); 
    } else {
      console.error("Ошибка при получении Проектов:", response.statusText);
    }
  } catch (error) {
    console.error("Ошибка при получении Проектов:", error); 
  }
};


export const addProject = async (newProject, projects, setProjects) => {
  try {
      const response = await fetch(`${BaseUrl}/Project`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(newProject)
      });
      if (response.ok) {
          const addedProject = await response.json();
          setProjects([...projects, addedProject]); 
      } else {
          console.error("Ошибка при добавлении задачи:", await response.text());
      }
  } catch (error) {
      console.error("Ошибка сети:", error);
  }
};