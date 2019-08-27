import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import styles from '../ModalLogin.module.css';

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    alignContent: `center`,
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const CustomizedSwitches = ({ toogleLang, isEng, langChangeInfo }) => {
  const changeLang = () => {
    toogleLang();
    langChangeInfo();
  };
  return (
    <FormGroup className={styles.langSwitch}>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Rus</Grid>
          <Grid item>
            <AntSwitch checked={isEng} onChange={changeLang} value="checkedC" />
          </Grid>
          <Grid item>Eng</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
};

CustomizedSwitches.propTypes = {
  toogleLang: PropTypes.func.isRequired,
  isEng: PropTypes.bool.isRequired,
  langChangeInfo: PropTypes.func.isRequired,
};
export default CustomizedSwitches;
