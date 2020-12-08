import React from 'react';
import ButtonAppBar from '../AppBar';
import Title from './Title';
import ClientInfo from './ClientInfo';
import Footer from '../Footer';
// import BuildWorkoutPlan from './BuildWorkoutPlan';
// import WorkoutPlans from './WorkoutPlans';
// import WorkoutSchedule from './WorkoutSchedule';

const ClientView = ({ setAuthenticated }) => {
    return (
        <>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <div className='client-view__container'>
                <Title />
                <ClientInfo />
                <div className='client-view__workout-plans'>
                    {/* <WorkoutSchedule/> */}
                    {/* <BuildWorkoutPlan /> */}
                    {/* <WorkoutPlans/> */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ClientView;
