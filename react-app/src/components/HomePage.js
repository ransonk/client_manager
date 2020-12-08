import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ButtonAppBar from './AppBar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Workouts from './workouts/Workouts';
import CreateNewWorkout from './workouts/CreateNewWorkout';
import CreateNewIntensity from './workouts/CreateNewIntensity';
import { Button } from '@material-ui/core';
import { authenticate } from "../services/auth";
import Intensities from './workouts/Intensities';
import { setCurrentUser, setCurrentClient, fetchClients, setTrainerClients, fetchWorkouts, setWorkouts, fetchIntensities, setIntensities } from "../store/users";

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
    const [name, setName] = useState();

    useEffect(() => {
        (async () => {
            const user = await authenticate();
            if (!user.errors) {
                setAuthenticated(true);
            }
            setLoaded(true);
            dispatch(setCurrentUser(user))
            setName(user.firstName)
            // interval(user.id)
            const clients = await fetchClients(user.id);
            dispatch(setTrainerClients(clients))

            const workouts = await fetchWorkouts(user.id);
            dispatch(setWorkouts(workouts))

            const intensities = await fetchIntensities(user.id);
            dispatch(setIntensities(intensities))
        })();
    }, []);

    if (!loaded) {
        return null;
    }


    return (
        <div className='home-page-layout'>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <div className='home-welcome__message'>Welcome Back, {name}</div>
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
            <div className='home-clients__container'>

                <div className='home-clients__payment'>
                    <h1 className='home-clients__header2'>Available Workouts</h1>
                    <div className='home-clients__workouts'>
                        <Workouts />
                    </div>
                    <CreateNewWorkout />


                </div>
                <div className='home-clients__payment'>
                    <h1 className='home-clients__header2'>Available Intensities</h1>
                    <div className='home-clients__workouts'>
                        <Intensities />
                    </div>
                    <CreateNewIntensity />



                </div>
            </div>
            <Footer className={classes.footer} />
        </div>
    );
}

export default HomePage;
