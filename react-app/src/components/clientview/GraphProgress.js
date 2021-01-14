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
    let workoutList = useSelector((state) => state.store.workouts)
    workoutList = Object.values(workoutList)
    console.log('workoutList ', workoutList)
    let exerciseRecord = {};


    workoutList.map(exercise => {
        if (!exerciseRecord[exercise.name]) {
            exerciseRecord[exercise.name] = []
        } else {
            exerciseRecord[exercise.name] = exerciseRecord[exercise.name] + 1
        }
    })

    console.log('exerciseRecord ', exerciseRecord)

    const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date))
    console.log('sort', sortedData)

    sortedData.forEach(record => {
        if (!exerciseRecord[record.workout1]) {
            exerciseRecord[record.workout1] = [record.date, record.workout1Score, 's'];
        } else {
            exerciseRecord[record.workout1] = [...exerciseRecord[record.workout1], record.date, record.workout1Score, 's'];
        }

        if (!exerciseRecord[record.workout2]) {
            exerciseRecord[record.workout2] = [record.date, record.workout2Score, 's'];
        } else {
            exerciseRecord[record.workout2] = [...exerciseRecord[record.workout2], record.date, record.workout2Score, 's'];
        }

        if (!exerciseRecord[record.workout3]) {
            exerciseRecord[record.workout3] = [record.date, record.workout3Score, 's'];
        } else {
            exerciseRecord[record.workout3] = [...exerciseRecord[record.workout3], record.date, record.workout3Score, 's'];
        }

        if (!exerciseRecord[record.workout4]) {
            exerciseRecord[record.workout4] = [record.date, record.workout4Score, 's'];
        } else {
            exerciseRecord[record.workout4] = [...exerciseRecord[record.workout4], record.date, record.workout4Score, 's'];
        }

        if (!exerciseRecord[record.workout5]) {
            exerciseRecord[record.workout5] = [record.date, record.workout5Score, 's'];
        } else {
            exerciseRecord[record.workout5] = [...exerciseRecord[record.workout5], record.date, record.workout5Score, 's'];
        }

        if (!exerciseRecord[record.workout6]) {
            exerciseRecord[record.workout6] = [record.date, record.workout6Score, 's'];
        } else {
            exerciseRecord[record.workout6] = [...exerciseRecord[record.workout6], record.date, record.workout6Score, 's'];
        }

        if (!exerciseRecord[record.workout7]) {
            exerciseRecord[record.workout7] = [record.date, record.workout7Score, 's'];
        } else {
            exerciseRecord[record.workout7] = [...exerciseRecord[record.workout7], record.date, record.workout7Score, 's'];
        }

        if (!exerciseRecord[record.workout8]) {
            exerciseRecord[record.workout8] = [record.date, record.workout8Score, 's'];
        } else {
            exerciseRecord[record.workout8] = [...exerciseRecord[record.workout8], record.date, record.workout8Score, 's'];
        }

    })

    console.log('updated exerciseRecord ', exerciseRecord)
    console.log('splitttted ', exerciseRecord['Rows'])
    console.log('wow entries?', Object.entries(exerciseRecord))

    let exerciseRecordList = Object.entries(exerciseRecord)

    let datasetRecords = []

    // sortedData.map(record => {
    //     return {
    //         label: record.
    //     }
    // })

    // for (let key of sortedData) {
    //     // console.log(sortedData[key])
    //     let needsSorting = sortedData[key];
    //     if (!needsSorting) return null;
    //     needsSorting.filter(item => {
    //         if (typeof (item) === 'number') {
    //             return scoreList.push(item)
    //         }
    //     })
    //     console.log('score list??? ', scoreList)

    exerciseRecordList.map(item => {
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
                borderColor: '#99c1de',
                borderWidth: 2,
                color: 'white',
                data: scoreList
            }

        )
    })



    const dates = sortedData.map(history => history.date)
    console.log('dates', dates)
    console.log('data set records????', datasetRecords)


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
                        text: 'Total Fitness Progression',
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
