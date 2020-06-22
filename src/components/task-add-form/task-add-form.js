import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  form: {
    display: 'flex',
  },
  submit: {
    width: '150px',
    marginLeft: theme.spacing(1),
  },
});

class TaskAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    e.preventDefault();
    const { text } = this.state;
    const { onAdd } = this.props;
    if (text !== '') {
      onAdd(text);
    } else {
      alert('No empty strings!'); // eslint-disable-line no-alert
    }
    this.setState({
      text: '',
    });
  }

  render() {
    const { classes } = this.props;
    const { text } = this.state;

    return (
      <form onSubmit={this.onSubmit} className={classes.form} noValidate>
        <TextField
          variant="outlined"
          fullWidth
          name="task"
          label="Task"
          type="text"
          id="task"
          onChange={this.onValueChange}
          value={text}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.submit}
        >
          Add
        </Button>
      </form>
    );
  }
}

TaskAddForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    form: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
};

export default withStyles(useStyles)(TaskAddForm);
