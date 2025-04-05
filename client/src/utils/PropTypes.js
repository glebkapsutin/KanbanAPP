import PropTypes from 'prop-types';

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            TaskName: PropTypes.string,
            Description: PropTypes.string,
        })
    ).isRequired,
};

ProjectList.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string,
        })
    ).isRequired,
    onSelectProject: PropTypes.func.isRequired,
    selectedProject: PropTypes.shape({
        id: PropTypes.number,
    }),
};
