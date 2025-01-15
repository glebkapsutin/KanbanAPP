import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; // Импортируем компоненты для drag-and-drop
import { updateStatusTask } from '../api/TaskApi'; // Импортируем функцию для обновления статуса задачи на сервере
import '../styles/KanbanBoard.css'; // Подключаем стили для канбан-доски

const KanbanBoard = ({ tasks, setTasks }) => {
  // Определяем статусные колонки
  const columns = {
    To_Do: 'To Do',
    In_Progress: 'In Progress',
    Done: 'Done',
  };

  // Отображаем статус задачи через числовые значения
  const statusMap = {
    0: 'To_Do',
    1: 'In_Progress',
    2: 'Done',
  };

  // Обратная карта для статусов (используем для изменения статуса)
  const reverseStatusMap = {
    To_Do: 0,
    In_Progress: 1,
    Done: 2,
  };

  // Функция, которая будет вызываться при окончании перетаскивания
  const handleDragEnd = async (result) => {
    const { source, destination } = result; // Источник и место назначения перетаскиваемого элемента

    // Если задача не была перемещена в другое место, выходим
    if (!destination) return;

    // Создаем копию массива задач, чтобы не изменять оригинальный
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1); // Удаляем перетаскиваемую задачу из списка

    const newStatus = reverseStatusMap[destination.droppableId]; // Получаем новый статус из droppableId
    console.log("New status from droppableId:", destination.droppableId, newStatus); // Логируем новый статус

    // Отправляем запрос на сервер для обновления статуса задачи
    const updatedTask = await updateStatusTask(movedTask.id, newStatus);

    // Если задача успешно обновлена на сервере
    if (updatedTask) {
      movedTask.status = newStatus; // Обновляем статус задачи
      updatedTasks.splice(destination.index, 0, movedTask); // Вставляем задачу обратно в новый статус
      setTasks(updatedTasks); // Обновляем состояние задач
    } else {
      // Если не удалось обновить статус на сервере
      console.error('Не удалось обновить задачу на сервере');
    }
  };

  return (
    // Контейнер для drag-and-drop
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {/* Для каждой колонки создаем отдельную секцию */}
        {Object.keys(columns).map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                className="kanban-column"
                ref={provided.innerRef} // Связываем элемент с драггируемым контейнером
                {...provided.droppableProps} // Добавляем необходимые пропсы для Droppable
              >
                <h2>{columns[status]}</h2> {/* Заголовок колонки (например, "To Do") */}
                
                {/* Фильтруем задачи по статусу и отображаем только те, которые соответствуют текущей колонке */}
                {tasks
                  .filter((task) => statusMap[task.status] === status)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="kanban-task"
                          ref={provided.innerRef} // Связываем задачу с драггируемым элементом
                          {...provided.draggableProps} // Добавляем необходимые пропсы для Draggable
                          {...provided.dragHandleProps} // Добавляем пропсы для перетаскивания
                        >
                          <h3>{task.taskName}</h3> {/* Название задачи */}
                          <p>{task.description}</p> {/* Описание задачи */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder} {/* Плейсхолдер для корректной работы драггирования */}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
