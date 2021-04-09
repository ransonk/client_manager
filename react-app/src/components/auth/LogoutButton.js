import React from "react";
import { logout } from "../../services/auth";
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logout: {
    width: '10px',
    backgroundColor: 'rgba(124,168,133, 0.8)',
    marginRight: '1rem',
    marginTop: '1rem',
    position: 'absolute',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.4)'
    },
    '@media(max-width: 376px)' : {
      marginTop: '0',
      marginRight: '2rem',
    }
  }
}));

const LogoutButton = ({ setAuthenticated }) => {
  const classes = useStyles();
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };



  return <Button onClick={onLogout} className={classes.logout}>Logout</Button>;
};

export default LogoutButton;
