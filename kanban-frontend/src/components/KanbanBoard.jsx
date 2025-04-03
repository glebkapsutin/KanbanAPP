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
  Tooltip,
  Chip,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { MoreVert, Assignment } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
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
}));

const TaskCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.2)',
  },
}));

const KanbanBoard = ({ tasks, setTasks }) => {
  const theme = useTheme();
  const columns = {
    To_Do: {
      title: 'To Do',
      color: '#FF6B6B',
    },
    In_Progress: {
      title: 'In Progress',
      color: '#4ECDC4',
    },
    Done: {
      title: 'Done',
      color: '#45B7D1',
    },
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
      <StyledPaper>
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {Object.entries(columns).map(([status, { title, color }]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <ColumnContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Box className="flex items-center justify-between mb-4">
                    <Typography
                      variant="h6"
                      className="font-semibold"
                      style={{ color }}
                    >
                      {title}
                    </Typography>
                    <Chip
                      label={tasks.filter((task) => statusMap[task.status] === status).length}
                      size="small"
                      style={{ backgroundColor: color, color: 'white' }}
                    />
                  </Box>

                  {tasks
                    .filter((task) => statusMap[task.status] === status)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <TaskCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <CardContent>
                              <Box className="flex items-start justify-between">
                                <Box className="flex items-start space-x-2">
                                  <Assignment className="mt-1" color="primary" />
                                  <Box>
                                    <Typography variant="subtitle1" className="font-medium">
                                      {task.taskName}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      className="mt-1"
                                    >
                                      {task.description}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Tooltip title="Дополнительные действия">
                                  <IconButton size="small">
                                    <MoreVert />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </CardContent>
                          </TaskCard>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
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
