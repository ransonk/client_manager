import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import { Divider, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import theme from '../../theme';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },



    // root: {
    //     minWidth: 275,
    //     margin: '0.5rem',
    //     overflowX: 'hidden',
    //     overflowY: 'hidden',
    //     height: '20rem',
    //     '&:hover': {
    //         overflowY: 'auto',
    //     }
    // },
    // bullet: {
    //     display: 'inline-block',
    //     margin: '0 2px',
    //     transform: 'scale(0.8)',
    // },
    // title: {
    //     fontSize: 14,
    //     color: '#457b9d',
    // },
    // pos: {
    //     marginBottom: 0,
    // },
    // bold: {
    //     fontWeight: 'bold',
    // },
    // delete: {
    //     position: 'relative',
    //     color: '#e63946',
    //     fontWeight: 'bold',
    //     "&:hover": {
    //         cursor: 'pointer'
    //     }
    // },
    // cardHeader: {
    //     marginBottom: '1rem',
    //     color: 'blue'
    // }
});

export default function ClientCalendar() {
    const classes = useStyles();
    const workoutPlans = useSelector((state) => state.store.workoutPlans)
    // console.log('workoutplans', workoutPlans)
    let workoutPlanList = Object.values(workoutPlans)

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
        // console.log('month translator broken')
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
    todaysWorkout = todaysWorkout[0]
    if (!todaysWorkout) return null;
    let time = todaysWorkout.time
    // let todayTime = todaysWorkout[0].time
    // setTime(todaysWorkout.time)





    // let tomorrowsWorkout = workoutPlanList.filter((workout) => {
    //     let workoutMonth = workout.date.toString().split('/')[0]
    //     let workoutDay = workout.date.toString().split('/')[1]

    //     if (day2 == workoutDay && mms == workoutMonth) {
    //         return workout
    //     } else {
    //         return
    //     }
    // })

    return (

        <div className='workoutplans__container'>


            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Today {time}</StyledTableCell>
                            <StyledTableCell align="right">Sets</StyledTableCell>
                            <StyledTableCell align="right">Reps</StyledTableCell>
                            <StyledTableCell align="right">Weight (lbs)</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workoutPlanList.map(workout => {

                            let m1 = workout.date.toString().split('/')[0]
                            let d1 = workout.date.toString().split('/')[1]

                            if (day1 == d1 && mms == m1) {


                                return (

                                    <>
                                        <TableRow key={workout.name}>
                                            <TableCell component="th" scope="row">
                                                {workout.workout1}
                                            </TableCell>
                                            <TableCell align="right">{(workout.set1.split(' '))[1]}</TableCell>
                                            <TableCell align="right">{(workout.set1.split(' '))[3]}</TableCell>
                                            <TableCell align="right">{workout.weight1 ? workout.weight1 : 'None'}</TableCell>
                                        </TableRow>
                                        {workout.workout2 ?
                                            <TableRow key={workout.name}>
                                                <TableCell component="th" scope="row">
                                                    {workout.workout2}
                                                </TableCell>
                                                <TableCell align="right">{(workout.set2.split(' '))[1]}</TableCell>
                                                <TableCell align="right">{(workout.set2.split(' '))[3]}</TableCell>
                                                <TableCell align="right">{workout.weight2 ? workout.weight2 : 'None'}</TableCell>
                                            </TableRow>
                                            : <TableRow></TableRow>}
                                        {workout.workout3 ?
                                            <TableRow key={workout.name}>
                                                <TableCell component="th" scope="row">
                                                    {workout.workout3}
                                                </TableCell>
                                                <TableCell align="right">{(workout.set3.split(' '))[1]}</TableCell>
                                                <TableCell align="right">{(workout.set3.split(' '))[3]}</TableCell>
                                                <TableCell align="right">{workout.weight3 ? workout.weight3 : 'None'}</TableCell>
                                            </TableRow>
                                            : <TableRow></TableRow>}
                                        {workout.workout4 ?
                                            <TableRow key={workout.name}>
                                                <TableCell component="th" scope="row">
                                                    {workout.workout4}
                                                </TableCell>
                                                <TableCell align="right">{(workout.set4.split(' '))[1]}</TableCell>
                                                <TableCell align="right">{(workout.set4.split(' '))[3]}</TableCell>
                                                <TableCell align="right">{workout.weight4 ? workout.weight4 : 'None'}</TableCell>
                                            </TableRow>
                                            : <TableRow></TableRow>}
                                        {workout.workout5 ?
                                            <TableRow key={workout.name}>
                                                <TableCell component="th" scope="row">
                                                    {workout.workout5}
                                                </TableCell>
                                                <TableCell align="right">{(workout.set5.split(' '))[1]}</TableCell>
                                                <TableCell align="right">{(workout.set5.split(' '))[3]}</TableCell>
                                                <TableCell align="right">{workout.weight5 ? workout.weight5 : 'None'}</TableCell>
                                            </TableRow>
                                            : <TableRow></TableRow>}
                                        {workout.workout6 ?
                                            <TableRow key={workout.name}>
                                                <TableCell component="th" scope="row">
                                                    {workout.workout6}
                                                </TableCell>
                                                <TableCell align="right">{(workout.set6.split(' '))[1]}</TableCell>
                                                <TableCell align="right">{(workout.set6.split(' '))[3]}</TableCell>
                                                <TableCell align="right">{workout.weight6 ? workout.weight6 : 'None'}</TableCell>
                                            </TableRow>
                                            : <TableRow></TableRow>}
                                        {workout.workout7 ?
                                            <TableRow key={workout.name}>
                                                <TableCell component="th" scope="row">
                                                    {workout.workout7}
                                                </TableCell>
                                                <TableCell align="right">{(workout.set7.split(' '))[1]}</TableCell>
                                                <TableCell align="right">{(workout.set7.split(' '))[3]}</TableCell>
                                                <TableCell align="right">{workout.weight7 ? workout.weight7 : 'None'}</TableCell>
                                            </TableRow>
                                            : <TableRow></TableRow>}
                                        {workout.workout8 ?
                                            <TableRow key={workout.name}>
                                                <TableCell component="th" scope="row">
                                                    {workout.workout8}
                                                </TableCell>
                                                <TableCell align="right">{(workout.set8.split(' '))[1]}</TableCell>
                                                <TableCell align="right">{(workout.set8.split(' '))[3]}</TableCell>
                                                <TableCell align="right">{workout.weight8 ? workout.weight8 : 'None'}</TableCell>
                                            </TableRow>
                                            : <TableRow></TableRow>}
                                    </>

                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >

    )
}
