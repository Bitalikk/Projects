import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom';
import classes from './Home.module.css';
import Earth from '../../img/Earth1.jpg';

// const useStyles = makeStyles(() => ({
//   button: {
//     margin: '20',
//   },
//   input: {
//     borderColor: 'red',
//   },
// }));

function Home() {
  // const materialClasses = useStyles();

  return (
    <div>
      <form
        className={classes.wrapper}
        onSubmit={e => {
          e.preventDefault();
          // alert('submit');
        }}
        noValidate
        autoComplete="off"
      >
        {/* <nav className={classes.buttons}>
          <Button>Register</Button>
          <Button
            onClick={() => alert('click')}
            className={materialClasses.button}
            type="submit"
          >
            login
          </Button>
          <Button>Active Games</Button>
          <Button>Contact Us</Button>
          <Button>Log Out</Button>
        </nav> */}
        <span className={classes.title}>Hello dear friend!</span>
        <p className={classes.description}>
          With our site you can argue with any person from anywhere in the
          world!
        </p>

        <p>
          <img className={classes.earth} src={Earth} alt="earth" />
        </p>

        <Button className={classes.deal}>
          <NavLink className={classes.click} exact to="/active_games">
            Click here to make deal and earn real money
          </NavLink>
        </Button>
        {/* <TextField
          id="outlined-name"
          label="Username"
          className={materialClasses.input}
          onChange={e => console.log(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Password"
          className={materialClasses.input}
          onChange={e => console.log(e.target.value)}
          margin="normal"
          variant="outlined"
        /> */}
      </form>
    </div>
  );
}

Home.propTypes = {};

export default connect(state => state)(Home);
