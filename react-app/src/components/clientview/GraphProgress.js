import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Line } from 'react-chartjs-2';
import { fetchWorkoutHistory, updateProgress } from "../../store/users";


function GraphProgress() {
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
    console.log('his', historicalData)
    const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date))
    console.log('sort', sortedData)

    const data = {

        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Pull Exercises',
                fill: false,
                lineTension: 0.2,
                backgroundColor: 'white',
                borderColor: '#99c1de',
                borderWidth: 2,
                color: 'white',
                data: [65, 59, 80, 81, 90]
            },
            {
                label: 'Push Exercises',
                fill: false,
                lineTension: 0.2,
                backgroundColor: 'white',
                borderColor: '#f28482',
                borderWidth: 2,
                color: 'white',
                data: [68, 69, 83, 83, 89]
            },
        ]
    }

    return (
        <div>
            <Line
                data={
                    historicalData.map(history => {

                    })
                }
                options={{
                    title: {
                        display: true,
                        text: 'Fitness Progression',
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
                }}
            />
        </div>
    );
}

export default GraphProgress;
