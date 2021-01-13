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
import { setCurrentUser, setCurrentClient, fetchClients, setTrainerClients, fetchTodaysPlans, setTodaysPlans, fetchWorkouts, setWorkouts, fetchIntensities, setIntensities, fetchTodaysClients, updateProgress, fetchAllWorkoutPlans, setAllWorkoutPlans } from "../store/users";
import ClientCalendar from './clientview/ClientCalendar';
import TodaysClients from './TodaysClients';
import TomorrowsClients from './TomorrowsClients';
import { Grid } from '@material-ui/core';
import ClientFrequency from './clientview/ClientFrequency'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';


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
    const [value, onChange] = useState(new Date());
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState();
    const [tomorrow, setTomorrow] = useState(false);
    // window.location.reload();
    let trainerId = useSelector(state => state.store.current_trainer.id)
    let allWorkoutPlans = useSelector(state => state.store.allWorkoutPlans)
    allWorkoutPlans = Object.values(allWorkoutPlans)
    console.log('all the plans ', allWorkoutPlans)


    //SORT BY TIME BELOW!
    //possibly coordinate color of total client session bars with timeslots in schedule

    let sortedByTimeList = allWorkoutPlans.map(item => item.time)
    sortedByTimeList.sort(function (a, b) {
        return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
    })

    let finalWorkoutPlanList = [];
    sortedByTimeList.forEach(time => {
        allWorkoutPlans.map(item => {
            if (time === item.time) {
                finalWorkoutPlanList.push(item)
            }
        })
    })

    let Event = finalWorkoutPlanList.map(plan => {
        let targetDate = plan.date.split('/')
        console.log('TARGET DATE???', targetDate)
        let tMonth = targetDate[0] - 1
        let tDay = targetDate[1]
        let tYear = targetDate[2]
        console.log('tMonth', tMonth)
        console.log('tDay', tDay)
        console.log('tYear', tYear)

        return {
            title: plan.time,
            start: new Date(tYear, tMonth, tDay),
            end: new Date(tYear, tMonth, tDay),
            AllDay: true
        }

    })

    console.log('events???', Event)

    // const Event = [
    //     {
    //         title: 'today',
    //         start: new Date(2021, 1, 12),
    //         end: new Date(2021, 1, 13),
    //         AllDay: true
    //     },
    //     {
    //         title: 'tomorrow',
    //         start: new Date(2021, 1, 14),
    //         end: new Date(2021, 1, 15),
    //         AllDay: false
    //     },
    // ]

    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;

    let yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    let date1 = mm + '/' + dd + '/' + yyyy;
    // console.log('year?????', yyyy)
    // console.log('date?????', date1)

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

            const workoutPlans = await fetchAllWorkoutPlans(trainerId);
            dispatch(setAllWorkoutPlans(workoutPlans))

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

    const localizer = momentLocalizer(moment)

    // const Event = [
    //     {
    //         title: 'today',
    //         start: new Date(2021, 1, 12),
    //         end: new Date(2021, 1, 13),
    //         AllDay: true
    //     },
    //     {
    //         title: 'tomorrow',
    //         start: new Date(2021, 1, 14),
    //         end: new Date(2021, 1, 15),
    //         AllDay: false
    //     },
    // ]

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
                <br />
                <br />
                <br />
                <Grid item xs={12} md={12} className='invisibar'></Grid>
                <Grid container>
                    <Grid item md={3}></Grid>
                    <Grid item xs={12} md={6}>
                        <ClientFrequency />
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
                <Grid item xs={12} md={12} className='invisibar'></Grid>
                <br />
                <br />
                <br />
                <Grid item xs={12} md={12} className='invisibar'></Grid>
                <Grid container>
                    <Grid item md={3}></Grid>
                    <Grid item xs={12} md={6}>
                        <Calendar
                            localizer={localizer}
                            views={['month']}
                            events={Event}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}

                        />
                    </Grid>
                    <Grid item md={3}></Grid>
                </Grid>
                <Grid item xs={12} md={12} className='invisibar'></Grid>
                <br />
                <br />
                <br />
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
