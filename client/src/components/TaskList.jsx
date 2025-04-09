import React from 'react';
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

const TaskList = ({ tasks, onEditTask, onDeleteTask, onStatusChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
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
                        <Typography
                          variant="subtitle1"
                          className="font-medium text-gray-800"
                        >
                          {task.taskName}
                        </Typography>
                        {task.deadline && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            className="flex items-center ml-2"
                          >
                            <AccessTimeIcon
                              fontSize="small"
                              className="mr-1"
                            />
                            {new Date(task.deadline).toLocaleDateString('ru-RU')}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          className="text-gray-600"
                        >
                          {task.description.split('\n')[0]}
                        </Typography>
                        <Box className="flex items-center mt-2 space-x-2">
                          <Chip
                            icon={<PersonIcon />}
                            label={getAssigneeName(task)}
                            size="small"
                            variant="outlined"
                            className="mr-2"
                          />
                          {task.priority !== null && (
                            <Chip
                              label={task.priority === 0 ? 'Низкий' : task.priority === 1 ? 'Средний' : task.priority === 2 ? 'Высокий' : ''}
                              size="small"
                              color={task.priority === 0 ? 'success' : task.priority === 1 ? 'warning' : task.priority === 2 ? 'error' : 'default'}
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
          onClick={() => {
            onEditTask(selectedTask);
            handleMenuClose();
          }}
          className="flex items-center space-x-2"
        >
          <EditIcon className="text-primary" />
          <Typography>Редактировать</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDeleteTask(selectedTask);
            handleMenuClose();
          }}
          className="flex items-center space-x-2 text-red-500"
        >
          <DeleteIcon />
          <Typography>Удалить</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskList;
