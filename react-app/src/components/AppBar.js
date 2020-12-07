import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from '../services/auth';
import ClientDrawer from './ClientDrawer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    nav: {
        display: "flex",
        justifyContent: "space-between"
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
    // const [authenticated, setAuthenticated] = useState(false);

    const toHome = async (e) => {
        window.location.href = '/'
    }

    const onLogout = async (e) => {
        await logout();
        setAuthenticated(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.nav}>
                    <ClientDrawer />
                    <Button color="inherit" onClick={toHome}>Home</Button>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                    {/* <LogoutButton /> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}
