import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ButtonAppBar from './AppBar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Workouts from './workouts/Workouts';
import CreateNewWorkout from './workouts/CreateNewWorkout';
import { Button } from '@material-ui/core';
import { authenticate } from "../services/auth";
import { setCurrentUser, setCurrentClient, fetchClients, setTrainerClients, fetchWorkouts, setWorkouts } from "../store/users";


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
    const dispatch = useDispatch();
    // const [authenticated, setAuthenticated] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const user = await authenticate();
            if (!user.errors) {
                setAuthenticated(true);
            }
            setLoaded(true);
            dispatch(setCurrentUser(user))
            // interval(user.id)
            const clients = await fetchClients(user.id);
            dispatch(setTrainerClients(clients))

            const workouts = await fetchWorkouts(user.id);
            dispatch(setWorkouts(workouts))
        })();
    }, []);

    if (!loaded) {
        return null;
    }


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
                    <CreateNewWorkout />


                </div>
            </div>
            <Footer className={classes.footer} />
        </div>
    );
}

export default HomePage;
