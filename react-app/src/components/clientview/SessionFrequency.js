import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Line } from 'react-chartjs-2';
import { fetchTrainerWorkoutHistory, fetchWorkoutHistory, updateProgress } from "../../store/users";

function SessionFrequency() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.store.current_trainer.id);
    const [history, setHistory] = useState();
    const historicalDataRaw = useSelector((state) => state.store.client_progress)
    const historicalData = Object.values(historicalDataRaw)
    let workoutList = useSelector((state) => state.store.workouts)
    // let history;

    useEffect(() => {
        (async () => {

            let tempHistory = await fetchTrainerWorkoutHistory(userId)
            setHistory(tempHistory)



        })();
    }, []);

    if (!history) return null;
    let historyArr = Object.values(history)
    workoutList = Object.values(workoutList)



    let exerciseRecord = {};
    let dateCounter = {};

    historyArr.sort((a, b) => new Date(a.date) - new Date(b.date))
    const dates = historyArr.map(history => history.date)

    dates.map(date => {
        let monthYrArr = date.split('/')
        let entry = `${monthYrArr[0]} ${monthYrArr[2]}`
        if (!dateCounter[entry]){
            dateCounter[entry] = 1;
        } else {
            dateCounter[entry] = dateCounter[entry] + 1
        }

    })

    let numToNameMonths = Object.entries(dateCounter)
    let labelMonths = []
    let monthCounts = []

    let finalDatesArray = numToNameMonths.map(num => {
        let dateToConvert = num[0]
        dateToConvert = dateToConvert.split(' ')
        let month = dateToConvert[0]
        let mms;
    if (month == '01') {
        mms = 'Jan';
    } else if (month == '02') {
        mms = 'Feb';
    } else if (month == '03') {
        mms = 'Mar';
    } else if (month == '04') {
        mms = 'Apr';
    } else if (month == '05') {
        mms = 'May';
    } else if (month == '06') {
        mms = 'Jun';
    } else if (month == '07') {
        mms = 'Jul';
    } else if (month == '08') {
        mms = 'Aug';
    } else if (month == '09') {
        mms = 'Sep';
    } else if (month == '10') {
        mms = 'Oct';
    } else if (month == '11') {
        mms = 'Nov';
    } else if (month == '12') {
        mms = 'Dec';
    }

    dateToConvert[0] = mms
    labelMonths.push(dateToConvert.join(' '))
    monthCounts.push(num[1])
    // return
    })





    console.log('labelMonths', labelMonths)
    console.log('monthCounts', monthCounts)

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

        for (let i = 0; i < unOrganizedDates.length - 1; i += 2) {
            organizedDates.push({ date: unOrganizedDates[i], score: unOrganizedDates[i + 1] })
        }
        organizedDates.sort((a, b) => new Date(a.date) - new Date(b.date))

        for (let i = 0; i < organizedDates.length; i++) {
            let date = organizedDates[i].date
            let score = organizedDates[i].score
            finalDates.push(date)
            finalDates.push(score)
        }
        exerciseRecord[key] = finalDates
    }


    let exerciseRecordList = Object.entries(exerciseRecord)
    let datasetRecords = []
    let borderColors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', "#43aa8b", "#577590", "#0081a7", "#fed9b7", '#f07167', "#00f5d4", "#d0f4de", "#c8553d", "#b09e99"]


    monthCounts.map((item, i) => {

        datasetRecords.push(

            {

                // label: item[0],
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'white',
                hoverBorderColor: 'orange',
                pointBorderColor: 'white',
                borderColor: 'red',
                borderWidth: 2,
                color: 'white',
                data: monthCounts
            }

            )
        })


        const data = {

            labels: labelMonths,
            datasets: datasetRecords,

        }

        return (
            <div>
            {
                dates.length ?
                <Line
                data={data}
                options={{
                    tooltips: {
                        enabled: false
                    },
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
                        text: 'Session Frequency (monthly)',
                        fontSize: 20,
                        fontColor: 'white',

                    },
                    legend: {
                        display: false,
                        position: 'right',
                        labels: {
                            fontColor: 'white'
                        }
                    },

                }}
                />
                :
                <>
                <div>

                    <h2>Targeted Exercise Progression</h2>
                    <br/>
                    <p>No Data to Display</p>
                </div>
                </>

            }
                </div>
                );
            }

            export default SessionFrequency;
