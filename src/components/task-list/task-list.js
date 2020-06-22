import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TaskListItem from '../task-list-item';

const TaskList = ({
  tasks, onDelete, onChecked, onChangeItem,
}) => {
  const elements = tasks.map((item) => {
    const { id, label, checked } = item;
    return (
      <ListItem key={id} dense>
        <TaskListItem
          label={label}
          checked={checked}
          onDelete={() => onDelete(id)}
          onChecked={() => onChecked(id)}
          onChangeItem={(body) => onChangeItem(body, id)}
        />
      </ListItem>
    );
  });

  return (
    <List>
      { elements }
    </List>
  );
};

TaskList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  onChangeItem: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default TaskList;
