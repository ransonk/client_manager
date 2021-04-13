import React from "react";
import { logout } from "../../services/auth";
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: 'transparent',
      color: 'white'
    }
  }
})

const LogoutButton = ({ setAuthenticated }) => {
  const classes = useStyles();
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };



  return (
    <div className='logout-btn'>
    <Button onClick={onLogout} disableRipple className={classes.root}>Logout</Button>
    </div>
  )
};

export default LogoutButton;
