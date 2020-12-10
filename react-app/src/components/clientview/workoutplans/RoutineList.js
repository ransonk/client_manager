import React, { useState, useEffect } from 'react';
import { fetchWorkoutPlans, setWorkoutPlans, fetchRoutineList, setRoutineLists } from '../../../store/users';
import { useDispatch, useSelector } from "react-redux";


function RoutineList(props) {
    const dispatch = useDispatch();
    const num = 0;
    // const routinelist = await fetchRoutineList(props.workoutId);
    // dispatch(setRoutineLists(routinelist))
    // console.log(routinelist)

    const workoutPlanId = Object.values(props)[0]

    useEffect(() => {
        (async () => {
            const routinelist = await fetchRoutineList(workoutPlanId);
            dispatch(setRoutineLists(routinelist))

        })();
    }, []);

    return (
        <div>
            Routine Lists go here
        </div>
    );
}

export default RoutineList;
