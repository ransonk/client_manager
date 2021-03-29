import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper,
    },
  }));

function TopThree(props) {
    const classes = useStyles();

    let topThreeClients = localStorage.getItem('asd9f0393y8fgkls233fxxh');
    topThreeClients = topThreeClients.split(',');

    return (
        <div>
            <h2>Top Clients</h2>
            <List component="nav" className={classes.root} aria-label="contacts">
                <ListItem button>
                    <ListItemIcon>
                    <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary={topThreeClients[0]} />
                </ListItem>
                <ListItem button>
                    <ListItemText inset primary={topThreeClients[1]} />
                </ListItem>
                <ListItem button>
                    <ListItemText inset primary={topThreeClients[2]} />
                </ListItem>
            </List>
        </div>
    );
}

export default TopThree;
