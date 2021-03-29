import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Doughnut } from 'react-chartjs-2';
import { fetchWorkoutHistory, updateProgress } from "../../store/users";


function FrequencyPie() {
    const dispatch = useDispatch();
    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))
    let id = client.id
    let workoutHistory;

    useEffect(() => {
        (async () => {


            workoutHistory = await fetchWorkoutHistory(id)
            dispatch(updateProgress(workoutHistory))


        })();
    }, [id]);

    const historicalDataRaw = useSelector((state) => state.store.client_progress)
    const historicalData = Object.values(historicalDataRaw)
    const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date))

    const dates = sortedData.map(history => history.date)

    let pushCount = sortedData.map(history => Number(history.pushCount))
    let pullCount = sortedData.map(history => Number(history.pullCount))
    pushCount = pushCount.reduce((a, b) => a + b, 0)
    pullCount = pullCount.reduce((a, b) => a + b, 0)

    let exerciseCounter = {};

    historicalData.forEach(record => {
        if (!exerciseCounter[record.workout1] && record.workout1 != ' ' && record.workout1 != '') {
            exerciseCounter[record.workout1] = 1
        } else if (exerciseCounter[record.workout1] && record.workout1 != ' ' && record.workout1 != '') {
            exerciseCounter[record.workout1] = exerciseCounter[record.workout1] + 1;
        }

        if (!exerciseCounter[record.workout2] && record.workout2 != ' ' && record.workout2 != '') {
            exerciseCounter[record.workout2] = 1
        } else if (exerciseCounter[record.workout2] && record.workout2 != ' ' && record.workout2 != '') {
            exerciseCounter[record.workout2] = exerciseCounter[record.workout2] + 1;
        }

        if (!exerciseCounter[record.workout3] && record.workout3 != ' ' && record.workout3 != '') {
            exerciseCounter[record.workout3] = 1
        } else if (exerciseCounter[record.workout3] && record.workout3 != ' ' && record.workout3 != '') {
            exerciseCounter[record.workout3] = exerciseCounter[record.workout3] + 1;
        }

        if (!exerciseCounter[record.workout4] && record.workout4 != ' ' && record.workout4 != '') {
            exerciseCounter[record.workout4] = 1
        } else if (exerciseCounter[record.workout4] && record.workout4 != ' ' && record.workout4 != '') {
            exerciseCounter[record.workout4] = exerciseCounter[record.workout4] + 1;
        }

        if (!exerciseCounter[record.workout5] && record.workout5 != ' ' && record.workout5 != '') {
            exerciseCounter[record.workout5] = 1
        } else if (exerciseCounter[record.workout5] && record.workout5 != ' ' && record.workout5 != '') {
            exerciseCounter[record.workout5] = exerciseCounter[record.workout5] + 1;
        }

        if (!exerciseCounter[record.workout6] && record.workout6 != ' ' && record.workout6 != '') {
            exerciseCounter[record.workout6] = 1
        } else if (exerciseCounter[record.workout6] && record.workout6 != ' ' && record.workout6 != '') {
            exerciseCounter[record.workout6] = exerciseCounter[record.workout6] + 1;
        }

        if (!exerciseCounter[record.workout7] && record.workout7 != ' ' && record.workout7 != '') {
            exerciseCounter[record.workout7] = 1
        } else if (exerciseCounter[record.workout7] && record.workout7 != ' ' && record.workout7 != '') {
            exerciseCounter[record.workout7] = exerciseCounter[record.workout7] + 1;
        }

        if (!exerciseCounter[record.workout8] && record.workout8 != ' ' && record.workout8 != '') {
            exerciseCounter[record.workout8] = 1
        } else if (exerciseCounter[record.workout8] && record.workout8 != ' ' && record.workout8 != '') {
            exerciseCounter[record.workout8] = exerciseCounter[record.workout8] + 1;
        }
    })

    let borderColors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', "#43aa8b", "#577590", "#0081a7", "#fed9b7", '#f07167', "#00f5d4", "#d0f4de", "#c8553d", "#b09e99"]


    const data = {

        datasets: [{
            data: Object.values(exerciseCounter),
            backgroundColor: borderColors,
            border: 'none'
        }],
        labels: Object.keys(exerciseCounter),
    }

    return (
        <div>
            <Doughnut
                data={data}
                options={{
                    title: {
                        display: true,
                        text: 'Targeted Exercise Frequency',
                        fontSize: 20,
                        fontColor: 'white',

                    },
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            fontColor: 'white'
                        }
                    },
                    animation: {
                        duration: 4000
                    }
                }}
            />
        </div>
    );
}

export default FrequencyPie;
