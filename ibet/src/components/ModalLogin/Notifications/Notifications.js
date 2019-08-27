import React from 'react';
import PropTypes from 'prop-types';

const Notifications = ({ pop }) => <>{pop()}</>;

export default Notifications;

Notifications.propTypes = {
  pop: PropTypes.func.isRequired,
};
