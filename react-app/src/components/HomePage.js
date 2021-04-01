import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ButtonAppBar from './AppBar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Workouts from './workouts/Workouts';
import CreateNewWorkout from './workouts/CreateNewWorkout';
import CreateNewIntensity from './workouts/CreateNewIntensity';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@material-ui/core';
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
import TopThree from './TopThree';
import ClientDrawer from './ClientDrawer';
import ClientInfo from './clientview/ClientInfo';
import ClientPayment from './clientview/ClientPayment';
import GraphProgress from './clientview/GraphProgress';
import FrequencyPie from './clientview/FrequencyPie';
import WorkoutPlans from './clientview/workoutplans/WorkoutPlans'
import EditClientProfile from './clientview/EditClientProfile';


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
    info: {
        backgroundColor: '#1b4332'
    }
}));


const HomePage = ({ setAuthenticated }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const [authenticated, setAuthenticated] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [info, setInfo] = useState('')
    const [value, onChange] = useState(new Date());
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState();
    const [calendar, setCalendar] = useState(false);
    const [stats, setStats] = useState(true);
    const [plan, setPlan] = useState(false);
    const [clientInfo, setClientInfo] = useState(true);
    const [clientStats, setClientStats] = useState(false);
    const [clientPlan, setClientPlan] = useState(false);
    const [clientView, setClientView] = useState(false);
    const [selectedClient, setSelectedClient] = useState("")
    const [time, setTime] = useState()

    const tick = () => {
        let today = new Date();
        setTime(today.toLocaleTimeString())
    }

    useEffect(() => {
        setInterval(tick, 1000);
    }, [])


    let trainerId = useSelector(state => state.store.current_trainer.id)
    let allWorkoutPlans = useSelector(state => state.store.allWorkoutPlans)
    allWorkoutPlans = Object.values(allWorkoutPlans)


    let sortedByTimeList = allWorkoutPlans.map(item => item.time)
    sortedByTimeList.sort(function (a, b) {
        return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
    })
    let finalWorkoutPlanList = [];
    sortedByTimeList.forEach(time => {
        allWorkoutPlans.map(item => {
            if (time === item.time) {

                if (!finalWorkoutPlanList.includes(item)){
                    finalWorkoutPlanList.push(item)
                }
            }
        })
    })

    let Event = finalWorkoutPlanList.map(plan => {
        let targetDate = plan.date.split('/')
        let tMonth = targetDate[0] - 1
        let tDay = targetDate[1]
        let tYear = targetDate[2]


        return {
            title: plan.time,
            name: plan.clientFirstName + ' ' + plan.clientLastName,
            time: plan.time,
            workout: plan.name,
            start: new Date(tYear, tMonth, tDay),
            end: new Date(tYear, tMonth, tDay),
            AllDay: true,
        }

    })

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

            const workoutPlans = await fetchAllWorkoutPlans(trainerId);
            dispatch(setAllWorkoutPlans(workoutPlans))

            const todaysPlans = await fetchTodaysPlans(trainerId)
            dispatch(setTodaysPlans(todaysPlans))

            const workouts = await fetchWorkouts(trainerId);
            dispatch(setWorkouts(workouts))

            const intensities = await fetchIntensities(trainerId);
            dispatch(setIntensities(intensities))


        })();
    }, [selectedClient]);


    if (!loaded) {
        return null;
    }

    const grabStats = () => {
        setStats(true)
        setCalendar(false)
        setPlan(false)
    }

    const grabCalendar = () => {
        setStats(false)
        setCalendar(true)
        setPlan(false)
    }

    const grabPlan = () => {
        setStats(false)
        setCalendar(false)
        setPlan(true)
    }

    const grabClientInfo = () => {
        setStats(false)
        setCalendar(false)
        setPlan(false)
        setClientInfo(true)
        setClientStats(false)
        setClientPlan(false)
        setClientView(true)
    }

    const grabClientStats = () => {
        setStats(false)
        setCalendar(false)
        setPlan(false)
        setClientInfo(false)
        setClientStats(true)
        setClientPlan(false)
        setClientView(true)
    }

    const grabClientPlan = () => {
        setStats(false)
        setCalendar(false)
        setPlan(false)
        setClientInfo(false)
        setClientStats(false)
        setClientPlan(true)
        setClientView(true)
    }

    // const grabToday = () => {
    //     setTomorrow(false)
    // }

    const handleClickOpen = (e) => {
        setInfo({
            name: e.name,
            workout: e.workout,
            time: e.time,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const localizer = momentLocalizer(moment)

    //     const showMore = (slot, e) => {
    //         e.preventDefault()
    //         this.props.onShowMore(slot)
    //     }
    // }

    const handleClickTrain = () => {
        setClientView(false);
        setSelectedClient("12345");
        grabStats();
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    {/* < ButtonAppBar setAuthenticated={setAuthenticated} /> */}
                </Grid>
            </Grid>
            <Grid container className='content__container'>

                {/* space */}
                <Grid item xs={12} className='content__top-margin'></Grid>
                {/* space */}

                {/* start */}
                <Grid item xs={1} md={2}></Grid>
                <Grid item xs={10} md={8} >
                    <Grid item md={2} className='side__margin'></Grid>
                    <Grid item md={12} className='content__title-bar'>

                    <h2>
                        {date1}
                    </h2>
                            <p className='content__title-text' onClick={handleClickTrain}>Train</p>
                    <h2>
                        {time}
                    </h2>


                    </Grid>

                    <Grid item md={3} className='side__margin'></Grid>


                    <Grid item md={3}></Grid>
                </Grid>
                <Grid item xs={1} md={2}></Grid>
                {/* end */}

                {/* start */}
                <Grid item xs={1} md={2}></Grid>
                <Grid item xs={1} md={2} className='side__bar'></Grid>
                <Grid item xs={12} md={6} className='selection__title-bar'>
                    {
                        !clientView
                        ?
                        <>
                            <a className={"selection__buttons"} onClick={grabCalendar}>Calendar</a>
                            <a className={"selection__buttons"} onClick={grabStats}>Stats</a>
                            <a className={"selection__buttons"} onClick={grabPlan}>Plan</a>
                            </>
                            :
                            <>
                                <a className={"selection__buttons"} onClick={grabClientInfo}>Info</a>
                                <a className={"selection__buttons"} onClick={grabClientStats}>Stats</a>
                                <a className={"selection__buttons"} onClick={grabClientPlan}>Plan</a>
                                </>

                    }
                </Grid>
                <Grid item xs={1} md={2}></Grid>
                {/* end */}

                {/* start */}
                <Grid item xs={1} md={2}></Grid>
                <Grid item xs={1} md={2} className='side__bar'>
                    <TopThree />
                    <br />
                    <ClientDrawer clientView={clientView} setClientView={setClientView} selectedClient={selectedClient} setSelectedClient={setSelectedClient} grabClientStats={grabClientStats} grabStats={grabStats}/>
                </Grid>
                <Grid item xs={12} md={6} className='main__content'>
                    {   stats && !clientView ?
                        <ClientFrequency />
                                :
                                calendar && !clientView ?
                                    <Calendar
                                        localizer={localizer}
                                        views={['month']}
                                        events={Event}
                                        startAccessor="start"
                                        endAccessor="end"
                                        style={{ height: 500 }}
                                        // onSelectEvent={(e) => alert(e.title)}
                                        onSelectEvent={(e) => handleClickOpen(e)}
                                        popup

                                    />
                                            :
                                            plan && !clientView ?
                                            <Grid container>
                                            {/* <Grid item xs={1} md={3}></Grid> */}
                                            <Grid item xs={12} md={6} className='home-clients__payment'>
                                                <h1 className='home-clients__header2'>Available Exercises</h1>
                                                <div className='home-clients__workouts'>
                                                    <Workouts />
                                                </div>
                                                <CreateNewWorkout />
                                            </Grid>

                                                <Grid item xs={12} md={6} className='home-clients__payment'>
                                                    <h1 className='home-clients__header2'>Available Intensities</h1>
                                                    <div className='home-clients__workouts'>
                                                        <Intensities />
                                                    </div>
                                                    <CreateNewIntensity />
                                                </Grid>
                                                {/* <Grid item xs={1} md={3}></Grid> */}
                                                </Grid>
                                                    :
                                                    clientInfo && clientView ?
                                                    <>
                                                    <Grid container>
                                                            {/* <Grid item xs={12} md={12}></Grid> */}
                                                            <Grid item md={3} className={classes.info}></Grid>
                                                            <Grid item xs={12} md={6} className={classes.info}>
                                                            <ClientInfo />
                                                            </Grid>
                                                            <Grid item md={3} className={classes.info}>
                                                            <EditClientProfile />

                                                            </Grid>
                                                            <Grid item md={3} className={classes.info}></Grid>
                                                            <Grid item xs={12} md={6} className={classes.info}>
                                                            <ClientPayment />
                                                            </Grid>
                                                            <Grid item md={3} className={classes.info}></Grid>
                                                            </Grid>
                                                    </>
                                                        :
                                                            clientStats && clientView ?
                                                            <>
                                                            <Grid container>
                                                            <Grid item xs={12} md={12}></Grid>
                                                            <Grid item md={2}></Grid>
                                                            <Grid item xs={12} md={8}>
                                                                <GraphProgress />
                                                            </Grid>
                                                            <Grid item md={2}></Grid>
                                                            <Grid item md={2}></Grid>
                                                            <Grid item xs={12} md={8}>
                                                                <FrequencyPie />
                                                            </Grid>
                                                            <Grid item md={2}></Grid>
                                                            </Grid>
                                                            </>
                                                                :
                                                                clientPlan && clientView ?
                                                                <>
                                                                <Grid container>
                                                                <Grid item xs={12} md={12}></Grid>
                                                                <Grid item md={3}></Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <ClientCalendar />
                                                                </Grid>
                                                                <Grid item md={3}></Grid>
                                                                <Grid item md={3}></Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <WorkoutPlans />
                                                                </Grid>
                                                                <Grid item md={3}></Grid>
                                                                </Grid>
                                                                </>
                                                                :
                                                                        'nothing'

                                            }
                </Grid>
                <Grid item xs={1} md={2}></Grid>
                {/* end */}

                {/* space */}
                <Grid item xs={12} className='content__top-margin'></Grid>
                {/* space */}

                {/* <Grid container> */}

                {/* </Grid> */}
                <Grid item xs={12} md={12} className='invisibar'></Grid>

                <Grid item xs={12} md={12} className='invisibar'></Grid>



            </Grid>
            <Grid item xs={12} md={12} className='invisibar'></Grid>



            {/* DIALOG CODE FOR CALENDAR BELOW */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{info.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Time: {info.time} <br></br>
                        {info.workout}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default HomePage;
