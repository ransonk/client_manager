import React, { useState } from 'react';
import ButtonAppBar from '../AppBar';
import Title from './Title';
import ClientInfo from './ClientInfo';
import Footer from '../Footer';
// import BuildWorkoutPlan from './BuildWorkoutPlan';
import WorkoutPlans from './workoutplans/WorkoutPlans';
// import WorkoutSchedule from './workoutplans/WorkoutSchedule';
import AddWorkoutPlan from './workoutplans/AddWorkoutPlan';
import ClientCalendar from './ClientCalendar';

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
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <div className='client-view__container'>
                <Title />
                <ClientInfo />
                <div className='workout-and-calendar__container'>


                    <div className={'client-buttons', (plans === false ? 'client-view__workout-sched-header-on' : 'client-view__workout-sched-header-off')} onClick={clickSchedule}>
                        <h1>Calendar</h1>
                    </div>
                    <div className={'client-buttons', (plans === true ? 'client-view__workout-plans-header-on' : 'client-view__workout-plans-header-off')} onClick={clickWorkoutPlans}>
                        <h1>Workout Plans</h1>
                    </div>
                    <div className='client-view__workout-plans'>
                        {plans ? <WorkoutPlans /> : <ClientCalendar />}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ClientView;
