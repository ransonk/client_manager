import React from 'react';
import ButtonAppBar from './AppBar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Workouts from './workouts/Workouts';

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
    footer: {
        position: 'absolute',
        bottom: '0'
    },
}));

const HomePage = ({ setAuthenticated }) => {
    const classes = useStyles();
    return (
        <div className='home-page-layout'>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <div className='home-clients__container'>

                <div className='home-clients__info'>
                    <h1 className='home-clients__header'>Today's Clients</h1>
                    <div className='home-clients__clientcard'>

                        <div className='home-clients__info__contact'>
                            <p className='card__header'>Contact</p>

                        </div>
                        <div className='home-clients__info__contact'>
                            <p className='card__header'>Stats</p>

                        </div>
                    </div>
                </div>
                <div className='home-clients__payment'>
                    <h1 className='home-clients__header'>Workouts</h1>
                    <div className='home-clients__workouts'>
                        <Workouts />
                    </div>

                </div>
            </div>
            <Footer className={classes.footer} />
        </div>
    );
}

export default HomePage;
