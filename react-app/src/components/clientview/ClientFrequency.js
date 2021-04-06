import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Bar } from 'react-chartjs-2';
import { fetchTrainerWorkoutHistory } from "../../store/users";


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
    let clientList = clientsArray.map(client => (client.firstName + ' ' + client.lastName))
    workoutPlans = Object.values(workoutPlans)

    let historyTracker = {}
    workoutPlans.map(history => {
        if (!historyTracker[history.client_id]) {
            historyTracker[history.client_id] = 1
        } else {
            historyTracker[history.client_id] = historyTracker[history.client_id] + 1
        }
    })
    let trackerData = Object.values(historyTracker)
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let numClients = trackerData.length;
    let clientColors = [];
    for (let i = 0; i < trackerData.length; i++) {
        clientColors.push(`#bde0fe`)
    }

    let GreatestToLeast = trackerData.map(num => num)

    let topClientsObj = {};
    for (let i = 0; i < GreatestToLeast.length; i++) {
        topClientsObj[GreatestToLeast[i]] = clientList[i]
    }
    GreatestToLeast.sort((a, b) => b-a)
    let finalTopClientList = [];
    for (let i = 0; i < 3; i++) {
        finalTopClientList.push(topClientsObj[GreatestToLeast[i]])
    };


    localStorage.setItem('asd9f0393y8fgkls233fxxh', finalTopClientList)

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
                                fontColor: "white",
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
