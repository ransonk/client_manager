import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        color: 'white',
        fontSize: '1.5rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
function Footer() {
    const classes = useStyles();
    const [time, setTime] = useState()

    const tick = () => {
        let today = new Date();
        setTime(today.toLocaleTimeString())
    }

    useEffect(() => {
        setInterval(tick, 1000);
    }, [])

    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    let date1 = mm + '/' + dd + '/' + yyyy;


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.nav}>
                    <div className='footer__day'>
                        {date1}
                    </div>
                    <div className='footer__time'>
                        {time}
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Footer;
