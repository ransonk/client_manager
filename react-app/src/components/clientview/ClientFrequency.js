import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Bar } from 'react-chartjs-2';
import { fetchTrainerWorkoutHistory, fetchWorkoutHistory, updateProgress } from "../../store/users";


function ClientFrequency() {
    let [workoutPlans, setWorkoutPlans] = useState('')


    const clients = useSelector((state) => state.store.clients)

    const trainer = useSelector((state) => state.store.current_trainer)
    const trainerId = trainer.id


    useEffect(() => {
        (async () => {
            const rawWorkoutHistory = await fetchTrainerWorkoutHistory(trainerId)
            setWorkoutPlans(rawWorkoutHistory)
        })();
    }, []);


    if (!clients) return null;
    let clientsArray = Object.values(clients)
    // console.log(clientsArray)
    let clientList = clientsArray.map(client => (client.firstName + ' ' + client.lastName))
    // console.log('client list', clientList)
    workoutPlans = Object.values(workoutPlans)
    console.log('plans', workoutPlans)

    let historyTracker = {}
    workoutPlans.map(history => {
        if (!historyTracker[history.client_id]) {
            historyTracker[history.client_id] = 1
        } else {
            historyTracker[history.client_id] = historyTracker[history.client_id] + 1
        }
    })
    // console.log('historyTracker ', historyTracker)
    let trackerData = Object.values(historyTracker)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let numClients = trackerData.length;
    let clientColors = [];
    for (let i = 0; i < trackerData.length; i++) {
        clientColors.push(`#bde0fe`)
    }
    // const clientColors = trackerData.map(tracker => `#${randomColor}`)
    // console.log('random', clientColors)
    // console.log('tracker', trackerData)

    const data = {

        datasets: [{
            data: trackerData,
            backgroundColor: clientColors,
            border: 'none',
            opacity: 0.5
        }],
        labels: clientList
    }

    return (
        <div className="chart-container">
            <Bar
                data={data}
                options={{
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: true,
                                color: 'gray',
                            },
                            ticks: {
                                fontColor: "white", // this here
                            },
                        }],
                        yAxes: [{
                            gridLines: {
                                color: 'gray',
                                offsetGridLines: true
                            },
                            offset: true,
                            ticks: {
                                fontColor: 'white',
                            }
                        }],

                    },
                    title: {
                        display: true,
                        text: 'Total Client Sessions',
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
        </div>
    );
}

export default ClientFrequency;
