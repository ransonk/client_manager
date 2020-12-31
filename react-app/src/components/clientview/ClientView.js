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
import GraphProgress from './GraphProgress';
import FrequencyPie from './FrequencyPie';


const ClientView = ({ setAuthenticated }) => {

    const [plans, setPlans] = useState(false);
    const [sched, setSched] = useState(true);

    const clickWorkoutPlans = (e) => {
        // e.preventDefault();
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

            <Grid container>
                <Grid item md={3}></Grid>
                <Grid item xs={12} md={6}>
                    <FrequencyPie />
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
            <br />
            <br />
            <br />
            <Grid container>
                <Grid item md={3}></Grid>
                <Grid item xs={12} md={6}>
                    <GraphProgress />
                </Grid>
                <Grid item md={3}></Grid>
            </Grid>
            <br />
            <br />
            <br />


            <Grid container xs={6} md={12} className='client-activity-block'>

                <Grid item md={3}></Grid>
                <Grid item md={6} className='today-workouts'>

                    <Grid item xs={12} md={12} className='client-buttons'>

                        {/* <div className='workout-and-calendar__container'> */}
                        <div className={'client-buttons', (plans === false ? 'client-view__workout-sched-header-on' : 'client-view__workout-sched-header-off')} onClick={clickSchedule}>
                            <p>Today's Schedule</p>
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
                <Grid item md={4}></Grid>
            </Grid>

            <Grid item xs={12} md={12} className='invisibar'></Grid>
            <Footer />
        </>
    );
}

export default ClientView;
