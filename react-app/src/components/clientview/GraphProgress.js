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
        if (!exerciseRecord[record.workout1] && record.workout1 != ' ' && record.workout1 != '') {
            exerciseRecord[record.workout1] = [record.date, record.workout1Score];
        } else if (exerciseRecord[record.workout1] && record.workout1 != ' ' && record.workout1 != '') {
            exerciseRecord[record.workout1] = [...exerciseRecord[record.workout1], record.date, record.workout1Score];
        }

        if (!exerciseRecord[record.workout2] && record.workout2 != ' ' && record.workout2 != '') {
            exerciseRecord[record.workout2] = [record.date, record.workout2Score];
        } else if (exerciseRecord[record.workout2] && record.workout2 != ' ' && record.workout2 != '') {
            exerciseRecord[record.workout2] = [...exerciseRecord[record.workout2], record.date, record.workout2Score];
        }

        if (!exerciseRecord[record.workout3] && record.workout3 != ' ' && record.workout3 != '') {
            exerciseRecord[record.workout3] = [record.date, record.workout3Score];
        } else if (exerciseRecord[record.workout3] && record.workout3 != ' ' && record.workout3 != '') {
            exerciseRecord[record.workout3] = [...exerciseRecord[record.workout3], record.date, record.workout3Score];
        }

        if (!exerciseRecord[record.workout4] && record.workout4 != ' ' && record.workout4 != '') {
            exerciseRecord[record.workout4] = [record.date, record.workout4Score];
        } else if (exerciseRecord[record.workout4] && record.workout4 != ' ' && record.workout4 != '') {
            exerciseRecord[record.workout4] = [...exerciseRecord[record.workout4], record.date, record.workout4Score];
        }

        if (!exerciseRecord[record.workout5] && record.workout5 != ' ' && record.workout5 != '') {
            exerciseRecord[record.workout5] = [record.date, record.workout5Score];
        } else if (exerciseRecord[record.workout5] && record.workout5 != ' ' && record.workout5 != '') {
            exerciseRecord[record.workout5] = [...exerciseRecord[record.workout5], record.date, record.workout5Score];
        }

        if (!exerciseRecord[record.workout6] && record.workout6 != ' ' && record.workout6 != '') {
            exerciseRecord[record.workout6] = [record.date, record.workout6Score];
        } else if (exerciseRecord[record.workout6] && record.workout6 != ' ' && record.workout6 != '') {
            exerciseRecord[record.workout6] = [...exerciseRecord[record.workout6], record.date, record.workout6Score];
        }

        if (!exerciseRecord[record.workout7] && record.workout7 != ' ' && record.workout7 != '') {
            exerciseRecord[record.workout7] = [record.date, record.workout7Score];
        } else if (exerciseRecord[record.workout7] && record.workout7 != ' ' && record.workout7 != '') {
            exerciseRecord[record.workout7] = [...exerciseRecord[record.workout7], record.date, record.workout7Score];
        }

        if (!exerciseRecord[record.workout8] && record.workout8 != ' ' && record.workout8 != '') {
            exerciseRecord[record.workout8] = [record.date, record.workout8Score];
        } else if (exerciseRecord[record.workout8] && record.workout8 != ' ' && record.workout8 != '') {
            exerciseRecord[record.workout8] = [...exerciseRecord[record.workout8], record.date, record.workout8Score];
        }

    })


    const dates = sortedData.map(history => history.date)

    dates.forEach(date => {

        for (let key in exerciseRecord) {
            if (!exerciseRecord[key].includes(date)) {
                exerciseRecord[key] = [...exerciseRecord[key], date, 0]


            }
        }

    })

    for (let key in exerciseRecord) {
        let unOrganizedDates = exerciseRecord[key]
        let organizedDates = []
        let finalDates = []
        console.log('LOOKIE HERE SON', unOrganizedDates)

        for (let i = 0; i < unOrganizedDates.length - 1; i += 2) {
            organizedDates.push({ date: unOrganizedDates[i], score: unOrganizedDates[i + 1] })
        }
        organizedDates.sort((a, b) => new Date(a.date) - new Date(b.date))
        console.log('new Object? ', organizedDates)

        for (let i = 0; i < organizedDates.length; i++) {
            let date = organizedDates[i].date
            let score = organizedDates[i].score
            finalDates.push(date)
            finalDates.push(score)
        }
        console.log('final Object? ', finalDates)
        exerciseRecord[key] = finalDates

    }


    let exerciseRecordList = Object.entries(exerciseRecord)
    let datasetRecords = []
    let borderColors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', "#43aa8b", "#577590", "#0081a7", "#fed9b7", '#f07167', "#00f5d4", "#d0f4de", "#c8553d", "#b09e99"]

    // dates.forEach(date => {

    //     exerciseRecordList.forEach(dateList => {
    //         if (!dateList.includes(date)) {
    //             dateList.push(date)
    //             dateList.push(0)
    //         }
    //     })

    // })

    // dates.forEach(date => {

    //     for (let key in exerciseRecord) {
    //         if (!exerciseRecord[key].includes(date)) {
    //             exerciseRecord[key] = [...exerciseRecord[key], date, 0]


    //         }
    //     }

    // })


    exerciseRecordList.map((item, i) => {
        let scoreList = [];
        item[1].forEach(num => {
            console.log('nummm', num)
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



    // const dates = sortedData.map(history => history.date)
    // console.log('dates', dates)
    // console.log('data set records????', datasetRecords)


    // dates.forEach(date => {

    //     exerciseRecordList.forEach(dateList => {
    //         if (!dateList.includes(date)) {
    //             dateList.push(date)
    //             dateList.push(0)
    //         }
    //     })

    // })

    // dates.forEach(date => {

    //     for (let key in exerciseRecord) {
    //         if (!exerciseRecord[key].includes(date)) {
    //             exerciseRecord[key] = [...exerciseRecord[key], date, 0]


    //         }
    //     }

    // })


    // for (let key in exerciseRecord) {
    //     let unOrganizedDates = exerciseRecord[key]
    //     let organizedDates = []
    //     let finalDates = []
    //     console.log('LOOKIE HERE SON', unOrganizedDates)

    //     for (let i = 0; i < unOrganizedDates.length - 1; i += 2) {
    //         organizedDates.push({ date: unOrganizedDates[i], score: unOrganizedDates[i + 1] })
    //     }
    //     organizedDates.sort((a, b) => new Date(a.date) - new Date(b.date))
    //     console.log('new Object? ', organizedDates)

    //     for (let i = 0; i < organizedDates.length; i++) {
    //         let date = organizedDates[i].date
    //         let score = organizedDates[i].score
    //         finalDates.push(date)
    //         finalDates.push(score)
    //     }
    //     console.log('final Object? ', finalDates)
    //     exerciseRecord[key] = finalDates

    // }


    // let unsortedDates = needsSorting.map
    // needsSorting.sort((a, b) => new Date(a.date) - new Date(b.date))
    // exerciseRecord[key] = needsSorting

    console.log('object reorganized?', exerciseRecord)




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


// sortedData.forEach(record => {
//     if (!exerciseRecord[record.workout1] && record.workout1 != ' ' && record.workout1 != '') {
//         exerciseRecord[record.workout1] = { date: record.date, score: record.workout1Score };
//     } else if (exerciseRecord[record.workout1] && record.workout1 != ' ' && record.workout1 != '') {
//         let workout1 = record.workout1;
//         exerciseRecord[workout1] = { ...exerciseRecord[workout1], date: record.date, score: record.workout1Score };
//     }

//     if (!exerciseRecord[record.workout2] && record.workout2 != ' ' && record.workout2 != '') {
//         exerciseRecord[record.workout2] = { date: record.date, score: record.workout2Score };
//     } else if (exerciseRecord[record.workout2] && record.workout2 != ' ' && record.workout2 != '') {
//         exerciseRecord[record.workout2] = { ...exerciseRecord[record.workout2], date: record.date, score: record.workout2Score };
//     }

//     if (!exerciseRecord[record.workout3] && record.workout3 != ' ' && record.workout3 != '') {
//         exerciseRecord[record.workout3] = { date: record.date, score: record.workout3Score };
//     } else if (exerciseRecord[record.workout3] && record.workout3 != ' ' && record.workout3 != '') {
//         exerciseRecord[record.workout3] = { ...exerciseRecord[record.workout3], date: record.date, score: record.workout3Score };
//     }

//     if (!exerciseRecord[record.workout4] && record.workout4 != ' ' && record.workout4 != '') {
//         exerciseRecord[record.workout4] = { date: record.date, score: record.workout4Score };
//     } else if (exerciseRecord[record.workout4] && record.workout4 != ' ' && record.workout4 != '') {
//         exerciseRecord[record.workout4] = { ...exerciseRecord[record.workout4], date: record.date, score: record.workout4Score };
//     }

//     if (!exerciseRecord[record.workout5] && record.workout5 != ' ' && record.workout5 != '') {
//         exerciseRecord[record.workout5] = { date: record.date, score: record.workout5Score };
//     } else if (exerciseRecord[record.workout5] && record.workout5 != ' ' && record.workout5 != '') {
//         exerciseRecord[record.workout5] = { ...exerciseRecord[record.workout5], date: record.date, score: record.workout5Score };
//     }

//     if (!exerciseRecord[record.workout6] && record.workout6 != ' ' && record.workout6 != '') {
//         exerciseRecord[record.workout6] = { date: record.date, score: record.workout6Score };
//     } else if (exerciseRecord[record.workout6] && record.workout6 != ' ' && record.workout6 != '') {
//         exerciseRecord[record.workout6] = { ...exerciseRecord[record.workout6], date: record.date, score: record.workout6Score };
//     }

//     if (!exerciseRecord[record.workout7] && record.workout7 != ' ' && record.workout7 != '') {
//         exerciseRecord[record.workout7] = { date: record.date, score: record.workout7Score };
//     } else if (exerciseRecord[record.workout7] && record.workout7 != ' ' && record.workout7 != '') {
//         exerciseRecord[record.workout7] = { ...exerciseRecord[record.workout7], date: record.date, score: record.workout7Score };
//     }

//     if (!exerciseRecord[record.workout8] && record.workout8 != ' ' && record.workout8 != '') {
//         exerciseRecord[record.workout8] = { date: record.date, score: record.workout8Score };
//     } else if (exerciseRecord[record.workout8] && record.workout8 != ' ' && record.workout8 != '') {
//         exerciseRecord[record.workout8] = { ...exerciseRecord[record.workout8], date: record.date, score: record.workout8Score };
//     }

// })
