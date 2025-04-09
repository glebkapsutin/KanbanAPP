import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  Box,
  Fade,
  Zoom,
  Chip,
} from '@mui/material';
import {
  Folder as FolderIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Компонент для отображения списка проектов
const ProjectList = ({ projects, onSelectProject, selectedProject }) => {
  return (
    <Box className="space-y-4">
      <Typography variant="h5" className="mb-4 font-bold text-primary">
        Список проектов
      </Typography>
      <List className="space-y-2">
        {projects.map((project) => (
          <Zoom in={true} timeout={300} key={project.id}>
            <ListItem
              disablePadding
              className="mb-2"
            >
              <ListItemButton
                onClick={() => onSelectProject(project.id)}
                className={`rounded-lg transition-all duration-300 backdrop-blur-sm bg-opacity-80 ${
                  selectedProject === project.id
                    ? 'bg-primary bg-opacity-10'
                    : 'hover:bg-gray-100'
                }`}
              >
                <ListItemIcon>
                  <FolderIcon
                    className={
                      selectedProject === project.id
                        ? 'text-primary'
                        : 'text-gray-500'
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      className={`font-medium ${
                        selectedProject === project.id
                          ? 'text-primary'
                          : 'text-gray-800'
                      }`}
                    >
                      {project.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      className="text-gray-600"
                    >
                      {project.description}
                    </Typography>
                  }
                />
                {selectedProject === project.id && (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Активный"
                    color="primary"
                    size="small"
                    className="ml-2"
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Zoom>
        ))}
      </List>
    </Box>
  );
};

export default ProjectList;
