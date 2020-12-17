import React, { useState } from 'react';
import ButtonAppBar from '../AppBar';
import Title from './Title';
import ClientInfo from './ClientInfo';
import ClientPayment from './ClientPayment';
import EditClientProfile from './EditClientProfile';
import Footer from '../Footer';
// import BuildWorkoutPlan from './BuildWorkoutPlan';
import WorkoutPlans from './workoutplans/WorkoutPlans';
// import WorkoutSchedule from './workoutplans/WorkoutSchedule';
import AddWorkoutPlan from './workoutplans/AddWorkoutPlan';
import ClientCalendar from './ClientCalendar';
import { Grid } from '@material-ui/core';


const ClientView = ({ setAuthenticated }) => {

    const [plans, setPlans] = useState(false);
    const [sched, setSched] = useState(true);

    const clickWorkoutPlans = (e) => {
        // window.alert('hi')
        setPlans(true);
        setSched(false);
    }

    const clickSchedule = (e) => {
        setPlans(false);
        setSched(true);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    < ButtonAppBar setAuthenticated={setAuthenticated} />
                </Grid>
            </Grid>


            <Grid item xs={12} md={12}>
                <Title />
            </Grid>


            <Grid item xs={12} md={12}>
                <EditClientProfile />
            </Grid>

            <Grid container>
                <Grid item md={3}></Grid>
                <Grid item xs={12} md={3}>
                    <ClientInfo />
                </Grid>
                <Grid item xs={12} md={3}>
                    <ClientPayment />
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
            <Grid item xs={12} md={12} className='invisibar'></Grid>
            <Grid item xs={12} md={12} className='invisibar'></Grid>
            <Grid item xs={12} md={12} className='invisibar'></Grid>
            <Grid container>

                <Grid item md={3}></Grid>
                <Grid item md={6} className='today-workouts'>

                    <Grid item xs={12} md={12} className='overview-buttons'>

                        {/* <div className='workout-and-calendar__container'> */}
                        <div className={'client-buttons', (plans === false ? 'client-view__workout-sched-header-on' : 'client-view__workout-sched-header-off')} onClick={clickSchedule}>
                            <p>Today</p>
                        </div>
                        <div className={'client-buttons', (plans === true ? 'client-view__workout-plans-header-on' : 'client-view__workout-plans-header-off')} onClick={clickWorkoutPlans}>
                            <p>Workout Plans</p>
                        </div>
                        {/* </div> */}
                    </Grid>
                    {/* <Grid item md={2}></Grid> */}
                    <Grid item xs={12} md={12}>
                        <div className='client-view__workout-plans'>
                            {plans ? <WorkoutPlans /> : <ClientCalendar />}
                        </div>
                    </Grid>

                </Grid>
                <Grid item md={3}></Grid>
            </Grid>

            <Footer />
        </>
    );
}

export default ClientView;
