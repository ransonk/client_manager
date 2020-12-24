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
import TomorrowsClients from './TomorrowsClients';
import { Grid } from '@material-ui/core';


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
    const [tomorrow, setTomorrow] = useState(false);
    // window.location.reload();
    let trainerId = useSelector(state => state.store.current_trainer.id)

    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    let date1 = mm + '/' + dd + '/' + yyyy;

    useEffect(() => {
        (async () => {
            const user = await authenticate();
            if (!user.errors) {
                setAuthenticated(true);
            }
            setLoaded(true);
            dispatch(setCurrentUser(user))
            setName(user.firstName)

            const clients = await fetchClients(trainerId);
            dispatch(setTrainerClients(clients))

            const todaysPlans = await fetchTodaysPlans(trainerId)
            dispatch(setTodaysPlans(todaysPlans))

            const workouts = await fetchWorkouts(trainerId);
            dispatch(setWorkouts(workouts))

            const intensities = await fetchIntensities(trainerId);
            dispatch(setIntensities(intensities))

        })();
    }, []);

    if (!loaded) {
        return null;
    }

    const grabTomorrow = () => {
        setTomorrow(true)
    }

    const grabToday = () => {
        setTomorrow(false)
    }


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    < ButtonAppBar setAuthenticated={setAuthenticated} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} className='home-welcome__message'>Welcome Back, {name}</Grid>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6} className='today-sched__container'>
                    <Grid item md={3}></Grid>

                    {/* <Grid item md={12} className='overview-date'>
                        <p>{date1}</p>
                    </Grid> */}
                    <Grid item md={12} className='overview__container'>

                        <p className='today-sched__title'>{tomorrow ? "Tomorrow's Overview" : "Today's Overview"}</p>
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item xs={12} md={12} className='overview-buttons'>
                        <div className={(tomorrow === false ? 'overview-button-today-on' : 'overview-button-today-off')} onClick={grabToday}>

                            <p>Today</p>
                        </div>
                        <div className={(tomorrow === true ? 'overview-button-tomorrow-on' : 'overview-button-tomorrow-off')} onClick={grabTomorrow}>
                            <p>Tomorrow</p>
                        </div>
                    </Grid>

                    <div className='todaysclients__container'>
                        {tomorrow ? <TomorrowsClients /> : <TodaysClients />}
                    </div>
                    <Grid item md={3}></Grid>
                </Grid>
                <Grid item xs={1} md={2}></Grid>
                {/* <div className='home-clients__container'> */}
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={12} md={6} className='home-clients__title'>Create a Routine</Grid>
                <Grid item xs={1} md={3}></Grid>
                {/* <div className='workouts-and-intensities'> */}
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={12} md={3} className='home-clients__payment'>
                    <h1 className='home-clients__header2'>Available Workouts</h1>
                    <div className='home-clients__workouts'>
                        <Workouts />
                    </div>
                    <CreateNewWorkout />


                </Grid>

                <Grid item xs={12} md={3} className='home-clients__payment'>
                    <h1 className='home-clients__header2'>Available Intensities</h1>
                    <div className='home-clients__workouts'>
                        <Intensities />
                    </div>
                    <CreateNewIntensity />
                </Grid>
                <Grid item xs={1} md={3}></Grid>
                {/* </div> */}
                {/* </div> */}
            </Grid>
            <Grid item xs={12} md={12} className='invisibar'></Grid>
            <Footer className={classes.footer} />
        </>
    );
}

export default HomePage;
