import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { logout } from '../services/auth';
import ClientDrawer from './ClientDrawer';
import { setUserLogout } from '../store/users';


export default function ButtonAppBar({ setAuthenticated }) {
    const dispatch = useDispatch();

    const toHome = async (e) => {
        window.location.href = '/'
    }

    const onLogout = async (e) => {
        dispatch(setUserLogout());
        await logout();
        setAuthenticated(false);
    };


    return (
        <div className='navigation'>
            <AppBar position="static">
                <p className='logo'>Trainer Hub</p>
                <Toolbar className='nav' >
                    <ClientDrawer />
                    <Button className='navButton' onClick={toHome}>Home</Button>
                    <Button className='navButton' onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
