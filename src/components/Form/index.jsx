import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaSignOutAlt } from 'react-icons/fa';

import './form.css';

// Form, with input and add/edit button
function Form(props) {
  const { handleChange, handleSubmit, newTask, editing, exitEditingMode } =
    props;

  return (
    <form onSubmit={handleSubmit} action="#" className="form">
      <input onChange={handleChange} type="text" value={newTask} />
      <button type="submit" className="create">
        <FaPlus />
      </button>
      {
        // if editing mode on, add a new button to exit
        editing !== -1 ? (
          <button
            type="button"
            className="exitEditingMode"
            onClick={exitEditingMode}
          >
            <FaSignOutAlt />
          </button>
        ) : null
      }
    </form>
  );
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  exitEditingMode: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
  editing: PropTypes.number.isRequired,
};

export default Form;
