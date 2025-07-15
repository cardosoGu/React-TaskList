import React, { Component } from 'react';

// components
import Form from './Form';
import Tasks from './Tasks';

import './main.css';

class Main extends Component {
  state = {
    newTask: '',
    taskList: [],
    editing: -1,
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) return;

    this.setState({
      taskList: tasks,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { taskList } = this.state;
    if (taskList === prevState.taskList) return;

    localStorage.setItem('tasks', JSON.stringify(taskList));
  }

  // functions

  // change newTask value, to create in tasklist
  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  // submit => if editing !== -1 this submit is to edit, else is to create
  handleSubmit = (e) => {
    e.preventDefault();
    const { taskList, editing } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (newTask === '') return;

    // if editing mode is on, so edit and return to do not create a new task
    if (editing !== -1) {
      const temporaryTaskList = [...taskList];
      temporaryTaskList.splice(editing, 1, newTask); // remove old task and add a new task
      this.setState({
        taskList: [...temporaryTaskList],
        newTask: '',
        editing: -1, // and come back to -1, to exit edit mode
      });
      return; // return a new task edited
    }

    if (taskList.includes(newTask)) return;

    this.setState({
      taskList: [...taskList, newTask],
      newTask: '',
    });
  };

  // delete this task
  handleDelete = (e, index) => {
    const { taskList } = this.state;
    const temporaryTaskList = [...taskList];
    temporaryTaskList.splice(index, 1);
    // in index[i] delete 1

    this.setState({
      taskList: [...temporaryTaskList],
    });
  };

  // just to join in 'edinting mode', changing de editing value to de index value
  handleEdit = (e, index, task) => {
    this.setState({
      newTask: task,
      editing: index,
    });
  };

  // just to exit of 'edinting mode', coming back the value to -1
  exitEditingMode = (e) => {
    this.setState({
      newTask: '',
      editing: -1,
    });
  };

  render() {
    const { newTask, taskList, editing } = this.state;
    return (
      <div className="main">
        <h1>Task list</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
          exitEditingMode={this.exitEditingMode}
          editing={editing}
        />

        <Tasks
          taskList={taskList}
          handleSubmit={this.handleEdit}
          handleChange={this.handleDelete}
        />
      </div>
    );
  }
}

export default Main;
