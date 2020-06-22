import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      text: props.label,
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onValueChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  onSubmit(e) {
    const { onChangeItem } = this.props;
    const { text } = this.state;
    e.preventDefault();
    if (text !== '') {
      onChangeItem(text);
    } else {
      alert('No empty strings!'); // eslint-disable-line no-alert
    }
    this.setState(() => ({
      editing: false,
    }));
  }

  onEdit() {
    this.setState(({ editing }) => ({
      editing: !editing,
    }));
  }

  renderTask() {
    const { editing, text } = this.state;
    const { label } = this.props;

    if (editing) {
      return (
        <form onSubmit={this.onSubmit} noValidate>
          <TextField
            name="edit-task"
            type="text"
            id="edit-task"
            onChange={this.onValueChange}
            value={text}
          />
        </form>
      );
    }

    return (
      <ListItemText primary={label} onClick={() => this.onEdit()} />
    );
  }

  render() {
    const {
      onDelete, onChecked, checked,
    } = this.props;
    return (
      <>
        <Checkbox checked={checked} onClick={onChecked} />
        {this.renderTask()}
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </>
    );
  }
}
TaskListItem.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
  onChangeItem: PropTypes.func.isRequired,
};

export default TaskListItem;
