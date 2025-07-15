import React from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import PropTypes from 'prop-types';

import './tasks.css';

// list os tasks
function Tasks({ taskList, handleDelete, handleEdit }) {
  return (
    <ul className="tasks">
      {taskList.map((task, index) => (
        <li key={task}>
          {task}
          <div>
            <FaEdit
              onClick={(e) => handleEdit(e, index, task)}
              className="edit"
            />
            <FaWindowClose
              onClick={(e) => handleDelete(e, index)} // take the event and pass to function and index along
              className="delete"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

Tasks.propTypes = {
  // need specify PropType of the dates inside array
  taskList: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default Tasks;
