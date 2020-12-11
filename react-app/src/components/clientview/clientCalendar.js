import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { Divider, Card, Typography } from '@material-ui/core';



const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '0.5rem',
        overflowX: 'hidden',
        overflowY: 'hidden',
        height: '20rem',
        '&:hover': {
            overflowY: 'scroll',
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        color: '#457b9d',
    },
    pos: {
        marginBottom: 0,
    },
    bold: {
        fontWeight: 'bold',
    },
    delete: {
        position: 'relative',
        color: '#e63946',
        fontWeight: 'bold',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    cardHeader: {
        marginBottom: '1rem',
        color: 'blue'
    }
});

export default function ClientCalendar() {
    const classes = useStyles();
    const workoutPlans = useSelector((state) => state.store.workoutplans)
    // console.log('workoutplans', workoutPlans)
    let workoutPlanList = Object.values(workoutPlans)
    console.log(workoutPlanList)

    const today = new Date()
    let month = today.toString().split(' ')[1]
    let day1 = today.toString().split(' ')[2]


    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    let day2 = tomorrow.toString().split(' ')[2]


    let mms;
    if (month.startsWith('Jan')) {
        mms = 1;
    } else if (month.startsWith('Feb')) {
        mms = 2;
    } else if (month.startsWith('Mar')) {
        mms = 3;
    } else if (month.startsWith('Apr')) {
        mms = 4;
    } else if (month.startsWith('May')) {
        mms = 5;
    } else if (month.startsWith('Jun')) {
        mms = 6;
    } else if (month.startsWith('Jul')) {
        mms = 7;
    } else if (month.startsWith('Aug')) {
        mms = 8;
    } else if (month.startsWith('Sep')) {
        mms = 9;
    } else if (month.startsWith('Oct')) {
        mms = 10;
    } else if (month.startsWith('Nov')) {
        mms = 11;
    } else if (month.startsWith('Dec')) {
        mms = 12;
    } else {
        console.log('month translator broken')
    }

    let todaysWorkout = workoutPlanList.filter((workout) => {
        let m1 = workout.date.toString().split('/')[0]
        let d1 = workout.date.toString().split('/')[1]

        if (day1 == d1 && mms == m1) {
            return workout
        } else {
            return
        }
    })
    // console.log(todaysWorkout)
    // workoutPlanList.map(workout => console.log(workout.date))

    let tomorrowsWorkout = workoutPlanList.filter((workout) => {
        let workoutMonth = workout.date.toString().split('/')[0]
        let workoutDay = workout.date.toString().split('/')[1]

        if (day2 == workoutDay && mms == workoutMonth) {
            return workout
        } else {
            return
        }
    })


    return (

        <div className='workoutplans__container'>

            {workoutPlanList.map(workout => {

                let m1 = workout.date.toString().split('/')[0]
                let d1 = workout.date.toString().split('/')[1]

                if (day1 == d1 && mms == m1) {


                    return (

                        // let year1 = workout.date.toString().split('/')[2]

                        //Turnary begins here, checking if day matches to return matching workoutplan
                        // (mms === month1 && day === day1) ?

                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom className={classes.cardHeader}>
                                    Today
                                </Typography>
                                <Divider />
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {workout.name}
                                </Typography>
                                <Typography>
                                    <span className={classes.title}>{workout.date}</span>
                                </Typography>
                                <Typography>
                                    Time: <span className={classes.title}>{workout.time}</span>
                                </Typography>
                                <br />
                                <Divider />
                                {/* <Typography className={classes.pos} color="textSecondary"> */}
                                <div>
                                    <p className={classes.bold}>{workout.workout1}</p>
                                    {workout.set1}
                                    <p className={classes.bold}>{workout.workout2}</p>
                                    {workout.set2}
                                    <p className={classes.bold}>{workout.workout3}</p>
                                    {workout.set3}
                                    <p className={classes.bold}>{workout.workout4}</p>
                                    {workout.set4}
                                    <p className={classes.bold}>{workout.workout5}</p>
                                    {workout.set5}
                                    <p className={classes.bold}>{workout.workout6}</p>
                                    {workout.set6}
                                    <p className={classes.bold}>{workout.workout7}</p>
                                    {workout.set7}
                                    <p className={classes.bold}>{workout.workout8}</p>
                                    {workout.set8}
                                </div>
                            </CardContent>
                        </Card>

                    )
                }
            })}
        </div>

    )
}
