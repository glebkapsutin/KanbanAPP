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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Fab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  MoreVert,
  Assignment,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
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
  transition: 'all 0.3s ease',
  cursor: 'grab',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px 0 rgba(31, 38, 135, 0.2)',
  },
  '&:active': {
    cursor: 'grabbing',
  },
}));

const KanbanBoard = ({ tasks, setTasks }) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);

  const columns = {
    To_Do: {
      title: 'To Do',
      color: '#FF6B6B',
      icon: <RadioButtonUncheckedIcon />,
    },
    In_Progress: {
      title: 'In Progress',
      color: '#4ECDC4',
      icon: <Assignment />,
    },
    Done: {
      title: 'Done',
      color: '#45B7D1',
      icon: <CheckCircleIcon />,
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

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StyledPaper>
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {Object.entries(columns).map(([status, { title, color, icon }]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <ColumnContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Box className="flex items-center justify-between mb-4">
                    <Box className="flex items-center space-x-2">
                      {React.cloneElement(icon, { style: { color } })}
                      <Typography
                        variant="h6"
                        className="font-semibold"
                        style={{ color }}
                      >
                        {title}
                      </Typography>
                    </Box>
                    <Chip
                      label={tasks.filter((task) => statusMap[task.status] === status).length}
                      size="small"
                      style={{ backgroundColor: color, color: 'white' }}
                    />
                  </Box>

                  <Box className="space-y-3">
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
                              onClick={() => handleTaskClick(task)}
                            >
                              <CardContent>
                                <Box className="flex justify-between items-start mb-2">
                                  <Typography variant="h6" className="font-medium">
                                    {task.name}
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
                                  {task.description}
                                </Typography>
                                <Box className="flex items-center justify-between">
                                  <Chip
                                    icon={<PersonIcon />}
                                    label={task.userName || 'Не назначен'}
                                    size="small"
                                    variant="outlined"
                                  />
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    className="flex items-center"
                                  >
                                    <AccessTimeIcon
                                      fontSize="small"
                                      className="mr-1"
                                    />
                                    {new Date(task.createdAt).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </TaskCard>
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

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          {selectedTask && (
            <>
              <DialogTitle className="flex justify-between items-center">
                <Typography variant="h5" className="font-semibold">
                  {selectedTask.name}
                </Typography>
                <Box className="flex space-x-2">
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box className="space-y-4 mt-4">
                  <TextField
                    fullWidth
                    label="Название"
                    value={selectedTask.name}
                    variant="outlined"
                    disabled
                  />
                  <TextField
                    fullWidth
                    label="Описание"
                    value={selectedTask.description}
                    variant="outlined"
                    multiline
                    rows={4}
                    disabled
                  />
                  <TextField
                    select
                    fullWidth
                    label="Статус"
                    value={statusMap[selectedTask.status]}
                    variant="outlined"
                    disabled
                  >
                    {Object.entries(columns).map(([key, { title }]) => (
                      <MenuItem key={key} value={key}>
                        {title}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Исполнитель"
                    value={selectedTask.userName || 'Не назначен'}
                    variant="outlined"
                    disabled
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Закрыть</Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        <Fab
          color="primary"
          aria-label="add"
          className="fixed bottom-6 right-6"
          onClick={() => {/* Обработчик добавления новой задачи */}}
        >
          <AddIcon />
        </Fab>
      </StyledPaper>
    </DragDropContext>
  );
};

export default KanbanBoard;
