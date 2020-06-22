import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import TaskAddForm from '../task-add-form';
import TaskList from '../task-list';

require('dotenv').config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
});

const useStyles = (theme) => ({
  app: {
    border: '1px solid lightgray',
    borderRadius: '10px',
    padding: '10px',
    marginTop: theme.spacing(8),
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  async componentDidMount() {
    await api.get('/')
      .then((res) => {
        const { data } = res;
        this.setState({ data });
      })
      .catch((err) => {
        console.error(`${err}`);
      });
  }

  async addItem(body) {
    const { data } = this.state;
    const newItem = { label: body, checked: false, id: data.length + 1 };

    await api.post('/', newItem)
      .then((res) => {
        console.log(`Success! Request status: ${res.status}`);
      })
      .catch((err) => {
        console.error(`${err}`);
      });

    const newArr = [...data, newItem];
    this.setState({
      data: newArr,
    });
  }

  async deleteItem(id) {
    const { data } = this.state;
    const index = data.findIndex((elem) => elem.id === id);
    const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

    await api.delete(`/${id}`)
      .then((res) => {
        console.log(`Success! Request status: ${res.status}`);
      })
      .catch((err) => {
        console.error(`${err}`);
      });

    this.setState({
      data: newArr,
    });
  }

  async checkItem(id) {
    const { data } = this.state;
    const index = data.findIndex((elem) => elem.id === id);
    const old = data[index];
    const newItem = { ...old, checked: !old.checked };
    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    await api.put(`/${id}`, newItem)
      .then((res) => {
        console.log(`Success! Request status: ${res.status}`);
      })
      .catch((err) => {
        console.error(`${err}`);
      });

    this.setState({
      data: newArr,
    });
  }

  async changeItem(body, id) {
    const { data } = this.state;
    const index = data.findIndex((elem) => elem.id === id);
    const old = data[index];
    const newItem = { ...old, label: body };
    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    await api.put(`/${id}`, newItem)
      .then((res) => {
        console.log(`Success! Request status: ${res.status}`);
      })
      .catch((err) => {
        console.error(`${err}`);
      });

    this.setState({
      data: newArr,
    });
  }

  render() {
    const { classes } = this.props;
    const { app } = classes;
    const { data } = this.state;

    return (
      <Container className={app} component="main" maxWidth="sm">
        <CssBaseline />
        <TaskAddForm onAdd={this.addItem} />
        <TaskList
          tasks={data}
          onDelete={(id) => this.deleteItem(id)}
          onChecked={this.checkItem}
          onChangeItem={(body, id) => this.changeItem(body, id)}
        />
      </Container>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({
    app: PropTypes.string,
  }).isRequired,
};

export default withStyles(useStyles)(App);
