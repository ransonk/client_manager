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
    console.log(clientsArray)
    let clientList = clientsArray.map(client => (client.firstName + ' ' + client.lastName))
    console.log('client list', clientList)
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
    console.log('historyTracker ', historyTracker)
    let trackerData = Object.values(historyTracker)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const clientColors = trackerData.map(tracker => randomColor)
    console.log('random', clientColors)

    const data = {

        datasets: [{
            data: trackerData,
            backgroundColor: clientColors,
            border: 'none'
        }],
        labels: clientList
    }

    return (
        <div>
            <Bar
                data={data}
                options={{
                    scales: {
                        yAxes: [{
                            gridLines: {
                                offsetGridLines: true
                            },
                            offset: true,
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Client Workout Sessions',
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
