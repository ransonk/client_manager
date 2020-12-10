import React from 'react';
import ButtonAppBar from '../AppBar';
import Title from './Title';
import ClientInfo from './ClientInfo';
import Footer from '../Footer';
// import BuildWorkoutPlan from './BuildWorkoutPlan';
import WorkoutPlans from './workoutplans/WorkoutPlans';
// import WorkoutSchedule from './workoutplans/WorkoutSchedule';
import AddWorkoutPlan from './workoutplans/AddWorkoutPlan';

const ClientView = ({ setAuthenticated }) => {

    return (
        <>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <div className='client-view__container'>
                <Title />
                <ClientInfo />
                <div className='client-view__workout-plans-header'>
                    <h1>Workout Plans</h1>
                    <AddWorkoutPlan />
                </div>
                <div className='client-view__workout-plans'>
                    <WorkoutPlans />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ClientView;
