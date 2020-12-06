import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DirectionsRunTwoTone from '@material-ui/icons/DirectionsRunTwoTone';
import { setCurrentClient } from '../store/users';
import { fetchCurrentClient } from '../store/users';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function ClientDrawer() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    //Grabs list of clients for display in drawer
    const clients = useSelector((state) => state.store.clients)
    if (!clients) return null;

    let clientsArray = Object.values(clients)


    const handleClick = async (id) => {
        // event.stopPropagation();
        let currentClient = clientsArray.filter(client => {
            if (client.id === id) return client;
        })
        await dispatch(setCurrentClient(currentClient))
        window.location.href = '/manage-client'
    }

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Current Clients'].map((text) => (
                    <ListItem button key={text}>
                        <ListItemIcon><ArrowDownward /></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider variant="middle" />
            <List>
                {clientsArray.map(({ firstName, lastName, id }) => (
                    <ListItem button key={id} onClick={() => handleClick(id)}>
                        <ListItemIcon><DirectionsRunTwoTone /></ListItemIcon>
                        <ListItemText primary={firstName + ' ' + lastName} />
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <div>
            {['clients'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
