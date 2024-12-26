import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { updateStatusTask } from '../api/TaskApi'; // Импортируем функцию для обновления статуса
import '../styles/KanbanBoard.css';

const KanbanBoard = ({ tasks, setTasks }) => {
  const columns = {
    To_Do: 'To Do',
    In_Progress: 'In Progress',
    Done: 'Done',
  };

  const statusMap = {
    0: 'To_Do',
    1: 'In_Progress',
    2: 'Done',
  };

  const reverseStatusMap = {
    To_Do: 0,
    In_Progress: 1,
    Done: 2,
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);

    const newStatus = reverseStatusMap[destination.droppableId];
    console.log("New status from droppableId:", destination.droppableId, newStatus);

    // Отправляем запрос на сервер для обновления статуса
    const updatedTask = await updateStatusTask(movedTask.id, newStatus);

    if (updatedTask) {
      movedTask.status = newStatus;
      updatedTasks.splice(destination.index, 0, movedTask);
      setTasks(updatedTasks);
    } else {
      console.error('Не удалось обновить задачу на сервере');
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {Object.keys(columns).map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                className="kanban-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2>{columns[status]}</h2>
                {tasks
                  .filter((task) => statusMap[task.status] === status)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="kanban-task"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <h3>{task.taskName}</h3>
                          <p>{task.description}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
