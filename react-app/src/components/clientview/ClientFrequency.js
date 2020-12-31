import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Bar } from 'react-chartjs-2';
import { fetchWorkoutHistory, updateProgress } from "../../store/users";


function ClientFrequency() {
    const clients = useSelector((state) => state.store.clients)
    if (!clients) return null;

    let clientsArray = Object.values(clients)
    console.log(clientsArray)
    let clientList = clientsArray.map(client => (client.firstName + ' ' + client.lastName))
    console.log('client list', clientList)


    const data = {

        datasets: [{
            data: [1, 2, 3, 4],
            backgroundColor: ['#f28482', '#99c1de', '#f28482', '#99c1de'],
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
