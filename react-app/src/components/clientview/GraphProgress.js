import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    //add dates of each workout plan + pull & push data to
    //constantly update graph
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

function GraphProgress() {

    return (
        <div>
            <Line
                data={data}
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
