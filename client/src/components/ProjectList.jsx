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
import { styled } from '@mui/material/styles';

const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(8px)',
  backgroundColor: selected 
    ? theme.palette.mode === 'dark'
      ? 'rgba(25, 118, 210, 0.15)'
      : 'rgba(25, 118, 210, 0.08)'
    : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.04)',
  },
}));

const ProjectTitle = styled(Typography)(({ theme, selected }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  color: selected
    ? theme.palette.primary.main
    : theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.grey[900],
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: theme.palette.mode === 'dark'
    ? theme.palette.grey[400]
    : theme.palette.grey[700],
  '&:hover': {
    color: theme.palette.mode === 'dark'
      ? theme.palette.grey[300]
      : theme.palette.grey[900],
  },
}));

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
            <ListItem disablePadding className="mb-2">
              <StyledListItemButton
                onClick={() => onSelectProject(project.id)}
                selected={selectedProject === project.id}
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
                    <ProjectTitle selected={selectedProject === project.id}>
                      {project.name}
                    </ProjectTitle>
                  }
                  secondary={
                    <ProjectDescription>
                      {project.description}
                    </ProjectDescription>
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
              </StyledListItemButton>
            </ListItem>
          </Zoom>
        ))}
      </List>
    </Box>
  );
};

export default ProjectList;
