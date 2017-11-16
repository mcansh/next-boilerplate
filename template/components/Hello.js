import React from 'react';
import PropTypes from 'prop-types';

const Hello = ({ name }) => (
  <div>
    <h1>Welcome to {name}!</h1>
  </div>
);

Hello.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Hello;
