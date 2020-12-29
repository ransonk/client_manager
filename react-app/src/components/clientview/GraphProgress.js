import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Line } from 'react-chartjs-2';


function GraphProgress() {
    const workoutPlans = useSelector((state) => state.store.workoutplans)
    let workoutPlanList = Object.values(workoutPlans)
    console.log('mapppp here', workoutPlanList)
    // console.log(Number(workoutPlanList[0].workout1) * Number(workoutPlanList[0].set1) * 100)


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
