import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from '../services/auth';
import ClientDrawer from './ClientDrawer';
import { setUserLogout } from '../store/users';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    nav: {
        display: "flex",
        justifyContent: "center !important",
        color: 'white',
        // fontWeight: 'bold'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function ButtonAppBar({ setAuthenticated }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const [authenticated, setAuthenticated] = useState(false);

    const toHome = async (e) => {
        window.location.href = '/'
    }

    const onLogout = async (e) => {
        dispatch(setUserLogout());
        await logout();
        setAuthenticated(false);
        // localStorage.clear();
    };


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.nav}>
                    <ClientDrawer />
                    <Button color="inherit" className='navButtons homebutton' onClick={toHome}>Home</Button>
                    <Button color="inherit" className='navButtons' onClick={onLogout}>Logout</Button>
                    {/* <LogoutButton /> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}
