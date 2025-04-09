import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  Zoom,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import TaskEditForm from './TaskEditForm';
import { deleteTask, updateTask } from '../api/TaskApi';

const StyledTaskTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 500,
  color: theme.palette.mode === 'dark' 
    ? theme.palette.common.white 
    : theme.palette.grey[900],
}));

const StyledTaskDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: theme.palette.mode === 'dark' 
    ? theme.palette.grey[400] 
    : theme.palette.grey[700],
  marginBottom: theme.spacing(1),
}));

const TaskList = ({ tasks, setTasks, showNotification }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditFormOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTask(selectedTask.id);
      
      // Обновляем список задач локально после удаления
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      
      showNotification('Задача успешно удалена', 'success');
    } catch (error) {
      showNotification(`Ошибка при удалении задачи: ${error.message}`, 'error');
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedTask(null);
    }
  };

  const handleSaveTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      
      // Обновляем список задач локально
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ));
      
      showNotification('Задача успешно обновлена', 'success');
    } catch (error) {
      showNotification(`Ошибка при обновлении задачи: ${error.message}`, 'error');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 2:
        return <CheckCircleIcon className="text-green-500" />;
      case 1:
        return <AccessTimeIcon className="text-yellow-500" />;
      default:
        return <RadioButtonUncheckedIcon className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 2:
        return 'success';
      case 1:
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 2:
        return 'Выполнено';
      case 1:
        return 'В процессе';
      default:
        return 'К выполнению';
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
    <Box className="space-y-4">
      <Typography variant="h5" className="mb-4 font-bold text-primary">
        Список задач
      </Typography>
      {tasks.length === 0 ? (
        <Typography variant="body1" className="text-gray-500 text-center py-4">
          Нет задач для отображения
        </Typography>
      ) : (
        <List className="space-y-2">
          {tasks.map((task) => (
            <Zoom in={true} timeout={300} key={task.id}>
              <ListItem
                disablePadding
                className="mb-2"
              >
                <ListItemButton
                  className="rounded-lg transition-all duration-300 backdrop-blur-sm bg-opacity-80 hover:bg-gray-100"
                >
                  <ListItemIcon>
                    {getStatusIcon(task.status)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box className="flex items-center justify-between">
                        <StyledTaskTitle>
                          {task.taskName}
                        </StyledTaskTitle>
                        {task.deadline && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: theme.palette.mode === 'dark' 
                                ? theme.palette.grey[400] 
                                : theme.palette.text.secondary
                            }}
                          >
                            {new Date(task.deadline).toLocaleDateString('ru-RU')}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <StyledTaskDescription>
                          {task.description?.split('\n')[0]}
                        </StyledTaskDescription>
                        <Box className="flex items-center mt-1">
                          <Chip
                            icon={<PersonIcon />}
                            label={getAssigneeName(task)}
                            size="small"
                            variant="outlined"
                            sx={{
                              marginRight: 1,
                              '& .MuiChip-label': {
                                color: theme.palette.mode === 'dark' 
                                  ? theme.palette.grey[300] 
                                  : theme.palette.text.primary
                              }
                            }}
                          />
                          {task.priority !== null && (
                            <Chip
                              label={task.priority === 0 ? 'Низкий' : task.priority === 1 ? 'Средний' : 'Высокий'}
                              size="small"
                              color={task.priority === 0 ? 'success' : task.priority === 1 ? 'warning' : 'error'}
                            />
                          )}
                        </Box>
                      </Box>
                    }
                  />
                  <Box className="flex items-center space-x-2">
                    <Chip
                      icon={getStatusIcon(task.status)}
                      label={getStatusText(task.status)}
                      color={getStatusColor(task.status)}
                      size="small"
                      className="ml-2"
                    />
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, task)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </ListItemButton>
              </ListItem>
            </Zoom>
          ))}
        </List>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        className="backdrop-blur-sm"
        PaperProps={{
          className: "rounded-xl backdrop-blur-sm bg-opacity-80",
        }}
      >
        <MenuItem
          onClick={handleEditClick}
          className="flex items-center space-x-2"
        >
          <EditIcon className="text-primary" />
          <Typography>Редактировать</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleDeleteClick}
          className="flex items-center space-x-2 text-red-500"
        >
          <DeleteIcon />
          <Typography>Удалить</Typography>
        </MenuItem>
      </Menu>

      {/* Диалог подтверждения удаления */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          className: "rounded-xl",
        }}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить задачу "{selectedTask?.taskName}"?
            Это действие нельзя будет отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Форма редактирования задачи */}
      <TaskEditForm
        open={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSaveTask={handleSaveTask}
        task={selectedTask}
      />
    </Box>
  );
};

export default TaskList;
