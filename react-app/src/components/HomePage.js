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
import { setCurrentUser, setCurrentClient, fetchClients, setTrainerClients, fetchTodaysPlans, setTodaysPlans, fetchWorkouts, setWorkouts, fetchIntensities, setIntensities, fetchTodaysClients } from "../store/users";
import ClientCalendar from './clientview/ClientCalendar';
import TodaysClients from './TodaysClients';


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
            localStorage.setItem('CURRENT_TRAINER_ID', JSON.stringify(user.id))

            const clients = await fetchClients(user.id);
            dispatch(setTrainerClients(clients))

            const todaysPlans = await fetchTodaysPlans(user.id)
            dispatch(setTodaysPlans(todaysPlans))

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
        <>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <div className='home-page__container'>
                <div className='home-welcome__message'>Welcome Back, {name}</div>
                <div className='home-clients__container'>
                    <p>Today's Clients</p>
                    <TodaysClients />
                </div>
                <div className='home-clients__container'>
                    <div className='home-clients__title'>Reusable Routines</div>
                    <div className='workouts-and-intensities'>
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
                </div>
            </div>
            <Footer className={classes.footer} />
        </>
    );
}

export default HomePage;
