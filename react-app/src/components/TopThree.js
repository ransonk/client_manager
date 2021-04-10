import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
    },
    Title: {
        paddingTop: '30px',
        fontFamily: 'Pacifico, cursive'
    },
    listItem: {
        fontFamily: 'Monteserrat, sans-serif'
    },
  }));

function TopThree({setSelectedClient, grabClientStats}) {
    const classes = useStyles();
    const clients = useSelector((state) => state.store.clients)
    if (!clients) return null;

    let clientsArray = Object.values(clients)

    let selectClientObj = {};
    clientsArray.forEach(client => {
        selectClientObj[client.lastName] = client.id
    })


    let topThreeClients = localStorage.getItem('asd9f0393y8fgkls233fxxh');
    if (!topThreeClients) return null;
    topThreeClients = topThreeClients.split(',');
    let lastNames = []
    topThreeClients.map(client => {
        client = client.split(' ')
        lastNames.push(client[1])
    })

    const handlePress = async (id) => {
        setSelectedClient(id);
        // setClientView(true);
        // grabStats();
        grabClientStats();
        let currentClientList = clientsArray.filter(client => {
            if (client.id === id) return client;
        })
        let currentClient = currentClientList[0]
        localStorage.setItem('CURRENT_CLIENT', JSON.stringify(currentClient))


    }

    return (
        <div className='topThree'>
            <h2 className={classes.Title}>Top Clients</h2>
            <List component="nav" className={classes.root} aria-label="contacts">
                <ListItem button>
                    <ListItemIcon>
                    <StarIcon />
                    </ListItemIcon>
                    <ListItemText disableTypography primary={topThreeClients[0]} className={classes.listItem} onClick={() => handlePress(selectClientObj[lastNames[0]])}/>
                </ListItem>
                <ListItem button>
                    <ListItemText inset disableTypography primary={topThreeClients[1]} className={classes.listItem} onClick={() => handlePress(selectClientObj[lastNames[1]])}/>
                </ListItem>
                <ListItem button>
                    <ListItemText inset disableTypography primary={topThreeClients[2]} className={classes.listItem} onClick={() => handlePress(selectClientObj[lastNames[2]])}/>
                </ListItem>
            </List>
        </div>
    );
}

export default TopThree;
