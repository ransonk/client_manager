import React from "react";
import { logout } from "../../services/auth";
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };



  return <Button onClick={onLogout} className='logout-btn'>Logout</Button>;
};

export default LogoutButton;
