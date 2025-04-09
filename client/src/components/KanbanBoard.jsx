import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { updateStatusTask } from '../api/TaskApi';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  MoreVert,
  Assignment,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: 'calc(100vh - 100px)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const ColumnContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: 'calc(100vh - 150px)',
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '12px',
  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 20px 0 rgba(31, 38, 135, 0.2)',
  },
}));

const TaskCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  cursor: 'grab',
  '&:hover': {
    boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.2)',
  },
  '&:active': {
    cursor: 'grabbing',
  },
}));

const DraggableTaskCard = styled(Card)(({ theme, isDragging }) => ({
  position: 'relative',
  userSelect: 'none',
  padding: theme.spacing(2),
  margin: `0 0 ${theme.spacing(2)} 0`,
  minHeight: '50px',
  borderRadius: '8px',
  background: isDragging 
    ? theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.background.paper
    : theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.background.default,
  boxShadow: isDragging 
    ? '0 8px 24px rgba(0, 0, 0, 0.25)' 
    : '0 2px 8px rgba(0, 0, 0, 0.08)',
  transform: isDragging ? 'rotate(1deg)' : 'rotate(0)',
  transition: 'background-color 0.2s ease, transform 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },
  '& .MuiTypography-root': {
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : 'inherit',
  },
  '& .MuiTypography-secondary': {
    color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.text.secondary,
  },
}));

const KanbanBoard = ({ tasks, setTasks }) => {
  const theme = useTheme();

  const columns = {
    To_Do: {
      title: 'К выполнению',
      color: '#FF6B6B',
      icon: <RadioButtonUncheckedIcon />,
    },
    To_Progress: {
      title: 'В работе',
      color: '#4ECDC4',
      icon: <Assignment />,
    },
    Done: {
      title: 'Готово',
      color: '#45B7D1',
      icon: <CheckCircleIcon />,
    },
  };

  const statusMap = {
    0: 'To_Do',
    1: 'To_Progress',
    2: 'Done',
  };

  const reverseStatusMap = {
    To_Do: 0,
    To_Progress: 1,
    Done: 2,
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    const newStatus = reverseStatusMap[destination.droppableId];

    try {
      const updatedTask = await updateStatusTask(movedTask.id, newStatus);
      if (updatedTask) {
        movedTask.status = newStatus;
        updatedTasks.splice(destination.index, 0, movedTask);
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса задачи:', error);
    }
  };

  const getAssigneeName = (task) => {
    if (task.user?.name) return task.user.name;
    if (task.description) {
      const match = task.description.match(/Исполнитель: (.*?)(?:\n|$)/);
      if (match) return match[1];
    }
    return 'Не назначен';
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StyledPaper>
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([status, { title, color, icon }]) => (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <ColumnContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: snapshot.isDraggingOver 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <Box className="flex items-center justify-between mb-4">
                    <Box className="flex items-center space-x-2">
                      {React.cloneElement(icon, { style: { color } })}
                      <Typography variant="h6" className="font-semibold" style={{ color }}>
                        {title}
                      </Typography>
                    </Box>
                    <Chip
                      label={tasks.filter(task => statusMap[task.status] === status).length}
                      size="small"
                      style={{ backgroundColor: color, color: 'white' }}
                    />
                  </Box>

                  <Box>
                    {tasks
                      .filter(task => statusMap[task.status] === status)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <DraggableTaskCard
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              isDragging={snapshot.isDragging}
                              style={{
                                ...provided.draggableProps.style,
                                transform: snapshot.isDragging 
                                  ? `${provided.draggableProps.style?.transform} translate(-50%, -50%)`
                                  : 'none',
                                transformOrigin: 'center',
                              }}
                            >
                              <Box className="flex justify-between items-start mb-2">
                                <Typography variant="h6" className="font-medium">
                                  {task.taskName}
                                </Typography>
                                <IconButton size="small">
                                  <MoreVert />
                                </IconButton>
                              </Box>
                              
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                className="mb-3"
                              >
                                {task.description?.split('\n')[0]}
                              </Typography>

                              <Box className="flex items-center justify-between">
                                <Box className="flex items-center space-x-2">
                                  <Chip
                                    icon={<PersonIcon />}
                                    label={getAssigneeName(task)}
                                    size="small"
                                    variant="outlined"
                                  />
                                  {task.priority !== null && (
                                    <Chip
                                      label={
                                        task.priority === 0 
                                          ? 'Низкий' 
                                          : task.priority === 1 
                                            ? 'Средний' 
                                            : 'Высокий'
                                      }
                                      size="small"
                                      color={
                                        task.priority === 0 
                                          ? 'success' 
                                          : task.priority === 1 
                                            ? 'warning' 
                                            : 'error'
                                      }
                                    />
                                  )}
                                </Box>
                                {task.deadline && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    className="flex items-center"
                                  >
                                    <AccessTimeIcon fontSize="small" className="mr-1" />
                                    {new Date(task.deadline).toLocaleDateString('ru-RU')}
                                  </Typography>
                                )}
                              </Box>
                            </DraggableTaskCard>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Box>
                </ColumnContainer>
              )}
            </Droppable>
          ))}
        </Box>
      </StyledPaper>
    </DragDropContext>
  );
};

export default KanbanBoard;
