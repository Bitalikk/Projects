import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  component: Component,
  redirectTo = '/',
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapState = state => ({
  isAuthenticated: state.session.isAuthenticated,
});

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.func.isRequired,
  component: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default connect(mapState)(ProtectedRoute);
