import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Fade,
  Zoom,
  Fab,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  CreateNewFolder as CreateNewFolderIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import { fetchProjects, addProject } from '../api/ProjectApi';

const Projects = ({ onSelectProject, selectedProject, showNotification }) => {
  const [projects, setProjects] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchProjects(setProjects);
  }, []);

  const handleAddProject = async (newProject) => {
    try {
      await addProject(newProject, projects, setProjects);
      showNotification('Проект успешно создан', 'success');
      setIsFormOpen(false);
    } catch (error) {
      showNotification('Ошибка при создании проекта', 'error');
    }
  };

  const actions = [
    { icon: <CreateNewFolderIcon />, name: 'Новый проект', action: () => setIsFormOpen(true) },
    { icon: <ViewListIcon />, name: 'Список проектов', action: () => {} },
  ];

  return (
    <Box className="space-y-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography 
          variant="h4" 
          className="font-bold text-primary"
          sx={{
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              : 'linear-gradient(45deg, #1976D2 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Мои проекты
        </Typography>
        {!isMobile && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setIsFormOpen(true)}
            className="shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <AddIcon />
          </Fab>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProjectList
            projects={projects}
            onSelectProject={onSelectProject}
            selectedProject={selectedProject}
          />
        </Grid>
      </Grid>

      <ProjectForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAddProject={handleAddProject}
      />

      {isMobile && (
        <SpeedDial
          ariaLabel="Меню проектов"
          className="fixed bottom-6 right-6"
          icon={<SpeedDialIcon />}
          FabProps={{
            className: "bg-primary shadow-lg hover:shadow-xl transition-all duration-300",
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.action}
              className="bg-white hover:bg-gray-100"
            />
          ))}
        </SpeedDial>
      )}
    </Box>
  );
};

export default Projects;
