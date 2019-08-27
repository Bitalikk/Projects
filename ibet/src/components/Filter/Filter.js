import React from 'react';
import Button from '@material-ui/core/Button';
import classes from './Filter.module.css';

const Filter = ({ onHandleChangeFilter, filter }) => {
  return (
    <div className={classes.buttons}>
      <Button
        onClick={() => onHandleChangeFilter('all')}
        disabled={filter === 'all'}
      >
        All
      </Button>
      <Button
        onClick={() => onHandleChangeFilter('isActive')}
        disabled={filter === 'isActive'}
      >
        Active
      </Button>
      <Button
        onClick={() => onHandleChangeFilter('closed')}
        disabled={filter === 'closed'}
      >
        In the game
      </Button>
      <Button
        onClick={() => onHandleChangeFilter('creatingDate')}
        disabled={filter === 'creatingDate'}
      />
    </div>
  );
};

export default Filter;
