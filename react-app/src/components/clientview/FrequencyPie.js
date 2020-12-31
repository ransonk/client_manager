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
    }, []);

    const historicalDataRaw = useSelector((state) => state.store.client_progress)
    const historicalData = Object.values(historicalDataRaw)
    // console.log('his', historicalData)
    const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date))
    // console.log('sort', sortedData)
    const dates = sortedData.map(history => history.date)
    // console.log('dates', dates)
    //DATES ARE NOW SORTED, YAY! MAP THROUGH THIS DATA BELOW FOR GRAPHICAL REPRESENTATION

    let pushCount = sortedData.map(history => Number(history.pushCount))
    let pullCount = sortedData.map(history => Number(history.pullCount))
    pushCount = pushCount.reduce((a, b) => a + b, 0)
    pullCount = pullCount.reduce((a, b) => a + b, 0)
    // console.log('Push freq ', pushCount, 'Pull freq ', pullCount)


    const data = {

        datasets: [{
            data: [pushCount, pullCount],
            backgroundColor: ['#f28482', '#99c1de'],
            border: 'none'
        }],
        labels: [
            'Push Frequency',
            'Pull Frequency'
        ]
    }

    return (
        <div>
            <Doughnut
                data={data}
                options={{
                    title: {
                        display: true,
                        text: 'Total Workout Frequency',
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
