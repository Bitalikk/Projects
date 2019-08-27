import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// import { searchUser } from './tableAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './CustomTable.module.css';
import Filter from '../Filter/Filter';
import { enterGame, handleOnApply, handleDelete } from './tableAction';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 650,
//   },
// }));

class CustomTable extends Component {
  state = {
    active: this.props.active,
    currentEnter: '',
    filter: 'all',
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentEnter } = this.state;
    const { active } = this.props;
    if (prevState.currentEnter !== currentEnter) {
      this.updateState();
    }

    if (prevProps.active !== active) {
      this.updateProps();
    }
  }

  updateProps = () => {
    this.setState({ active: this.props.active });
  };

  handleChange = e => {
    if (typeof this.state.currentEnter === 'string') {
      this.setState({
        currentEnter: e.target.value,
      });
    }
  };

  updateState = () => {
    const newTable = [];
    const regObj = new RegExp(this.state.currentEnter, 'gi');
    this.props.active.forEach(el => {
      if (el.userName.match(regObj)) {
        newTable.push(el);
      }
    });
    this.setState({
      active: newTable,
    });
  };

  onHandleDelete = row => {
    const { onDelete, session } = this.props;
    onDelete(row._id, session.token);
  };

  onHandleActiveGame = row => {
    const { session, apply } = this.props;
    if (row.points <= +session.user.points) {
      console.log('click');
      this.props.enterGame(row.id);
      const betData = { ...row };
      betData.partnerID = session.user.id;
      betData.partnerName = session.user.userName;
      apply(row._id, betData, session.token);
    }
  };

  onHandleChangeFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { active, filter } = this.state;
    const { session, disabledFunc } = this.props;
    let filtredActive;
    if (filter === 'closed') {
      filtredActive = active.filter(el => el.isActive);
    } else if (filter === 'isActive') {
      filtredActive = active.filter(el => !el.isActive);
    } else {
      filtredActive = active;
    }
    return (
      <Paper className={classes.root}>
        {!disabledFunc && (
          <Filter
            filter={filter}
            onHandleChangeFilter={this.onHandleChangeFilter}
          />
        )}
        <TextField
          id="outlined-name"
          label="Name"
          className={classes.input}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">User name</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Bet value</TableCell>
              <TableCell align="right">Exit date</TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtredActive &&
              filtredActive.length > 0 &&
              filtredActive.map((row, indx) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {indx + 1}
                  </TableCell>
                  <TableCell align="right">{row.userName}</TableCell>
                  <TableCell align="right">{row.points}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.betValue}</TableCell>
                  <TableCell align="right">
                    {new Date(row.exitDate).toLocaleString('en-GB')}
                  </TableCell>
                  <TableCell align="right">
                    {session.user.id !== row.userID && (
                      <Button
                        onClick={() => this.onHandleActiveGame(row)}
                        type="button"
                        disabled={'partnerID' in row}
                      >
                        apply
                      </Button>
                    )}
                    <TableCell>
                      {session.user.id === row.userID && (
                        <Button
                          onClick={() => this.onHandleDelete(row)}
                          type="button"
                          disabled={'partnerID' in row}
                        >
                          delete
                        </Button>
                      )}
                    </TableCell>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

CustomTable.propTypes = {
  active: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  session: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  enterGame: PropTypes.func.isRequired,
  apply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  disabledFunc: PropTypes.bool,
};

CustomTable.defaultProps = {
  disabledFunc: false,
};

const mapDispatchToProps = dispatch => ({
  enterGame: id => dispatch(enterGame(id)),
  apply: (id, data, token) => dispatch(handleOnApply(id, data, token)),
  onDelete: (id, data, token) => dispatch(handleDelete(id, data, token)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CustomTable);
