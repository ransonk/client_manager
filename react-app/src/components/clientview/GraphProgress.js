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
    // console.log('his', historicalData)
    const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date))
    // console.log('sort', sortedData)
    const dates = sortedData.map(history => history.date)
    // console.log('dates', dates)
    //DATES ARE NOW SORTED, YAY! MAP THROUGH THIS DATA BELOW FOR GRAPHICAL REPRESENTATION

    let pushScore = sortedData.map(history => history.pushScore)
    let pullScore = sortedData.map(history => history.pullScore)

    const data = {

        labels: dates,
        // labels: ['January', 'February', 'March',
        //     'April', 'May'],
        datasets: [
            {
                label: 'Pull Exercises',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'white',
                hoverBorderColor: 'orange',
                pointBorderColor: 'white',
                borderColor: '#99c1de',
                borderWidth: 2,
                color: 'white',
                // data: [65, 59, 80, 81, 90]
                data: pullScore
            },
            {
                label: 'Push Exercises',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'white',
                hoverBorderColor: 'orange',
                pointBorderColor: 'white',
                borderColor: '#f28482',
                borderWidth: 2,
                color: 'white',
                // data: [68, 69, 83, 83, 89]
                data: pushScore
            },
        ]
    }

    return (
        <div>
            <Line
                data={data}
                options={{
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: true,
                            },
                            ticks: {
                                fontColor: "white", // this here
                            },
                        }],
                        yAxes: [{
                            display: true,
                            gridLines: {
                                display: true,
                            },
                            ticks: {
                                fontColor: "white", // this here
                            },
                        }],
                    },
                    title: {
                        display: true,
                        text: 'Lifetime Fitness Progression',
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
