import React from 'react';
import ButtonAppBar from '../AppBar';
import Title from './Title';
import ClientInfo from './ClientInfo';
import Footer from '../Footer';
// import BuildWorkoutPlan from './BuildWorkoutPlan';
import WorkoutPlans from './workoutplans/WorkoutPlans';
// import WorkoutSchedule from './workoutplans/WorkoutSchedule';
import AddWorkoutPlan from './workoutplans/AddWorkoutPlan';
import ClientCalendar from './clientCalendar';

const ClientView = ({ setAuthenticated }) => {

    return (
        <>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <div className='client-view__container'>
                <Title />
                <ClientInfo />
                <div className='workout-and-calendar__container'>


                    <div className='client-view__workout-calendar-header'>
                        <h1>Calendar</h1>
                    </div>
                    <div className='client-view__workout-schedule'>
                        <ClientCalendar />
                    </div>
                    <div className='client-view__workout-plans-header'>
                        <h1>Workout Plans</h1>
                        <AddWorkoutPlan />
                    </div>
                    <div className='client-view__workout-plans'>
                        <WorkoutPlans />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ClientView;
