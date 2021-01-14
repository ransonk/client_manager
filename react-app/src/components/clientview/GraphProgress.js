import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Line } from 'react-chartjs-2';
import { fetchWorkoutHistory, updateProgress } from "../../store/users";

//CHECK ON ACCURACY OF HISTORICAL DATA MATCHING PROGRESSION GRAPH,
//SEEMS THAT NEW WORKOUTS AUTOMATICALLY MAKE THEIR WAY TO THE CHART

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
    let workoutList = useSelector((state) => state.store.workouts)
    workoutList = Object.values(workoutList)

    let exerciseRecord = {};


    // workoutList.map(exercise => {
    //     if (!exerciseRecord[exercise.name]) {
    //         exerciseRecord[exercise.name] = []
    //     } else {
    //         exerciseRecord[exercise.name] = exerciseRecord[exercise.name] + 1
    //     }
    // })



    const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date))


    sortedData.forEach(record => {
        if (!exerciseRecord[record.workout1]) {
            exerciseRecord[record.workout1] = [record.date, record.workout1Score];
        } else {
            exerciseRecord[record.workout1] = [...exerciseRecord[record.workout1], record.date, record.workout1Score];
        }

        if (!exerciseRecord[record.workout2]) {
            exerciseRecord[record.workout2] = [record.date, record.workout2Score];
        } else {
            exerciseRecord[record.workout2] = [...exerciseRecord[record.workout2], record.date, record.workout2Score];
        }

        if (!exerciseRecord[record.workout3]) {
            exerciseRecord[record.workout3] = [record.date, record.workout3Score];
        } else {
            exerciseRecord[record.workout3] = [...exerciseRecord[record.workout3], record.date, record.workout3Score];
        }

        if (!exerciseRecord[record.workout4]) {
            exerciseRecord[record.workout4] = [record.date, record.workout4Score];
        } else {
            exerciseRecord[record.workout4] = [...exerciseRecord[record.workout4], record.date, record.workout4Score];
        }

        if (!exerciseRecord[record.workout5]) {
            exerciseRecord[record.workout5] = [record.date, record.workout5Score];
        } else {
            exerciseRecord[record.workout5] = [...exerciseRecord[record.workout5], record.date, record.workout5Score];
        }

        if (!exerciseRecord[record.workout6]) {
            exerciseRecord[record.workout6] = [record.date, record.workout6Score];
        } else {
            exerciseRecord[record.workout6] = [...exerciseRecord[record.workout6], record.date, record.workout6Score];
        }

        if (!exerciseRecord[record.workout7]) {
            exerciseRecord[record.workout7] = [record.date, record.workout7Score];
        } else {
            exerciseRecord[record.workout7] = [...exerciseRecord[record.workout7], record.date, record.workout7Score];
        }

        if (!exerciseRecord[record.workout8]) {
            exerciseRecord[record.workout8] = [record.date, record.workout8Score];
        } else {
            exerciseRecord[record.workout8] = [...exerciseRecord[record.workout8], record.date, record.workout8Score];
        }

    })


    let exerciseRecordList = Object.entries(exerciseRecord)

    let datasetRecords = []
    let borderColors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', "#43aa8b", "#577590", "#0081a7", "#fed9b7", '#f07167', "#00f5d4", "#d0f4de", "#c8553d", "#b09e99"]


    exerciseRecordList.map((item, i) => {
        let scoreList = [];
        item[1].forEach(num => {
            if (typeof (num) == 'number') {
                scoreList.push(num)
            }
        })
        datasetRecords.push(

            {

                label: item[0],
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'white',
                hoverBorderColor: 'orange',
                pointBorderColor: 'white',
                borderColor: borderColors[i],
                borderWidth: 2,
                color: 'white',
                data: scoreList
            }

        )
    })



    const dates = sortedData.map(history => history.date)
    console.log('dates', dates)
    console.log('data set records????', datasetRecords)


    const data = {

        labels: dates,
        datasets: datasetRecords,

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
                        text: 'Targeted Exercise Progression',
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
