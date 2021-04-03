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
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
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
    if (!todaysWorkout) {
        return (
                <>
                <div>

                    <h2>Nothing Scheduled for Today</h2>
                    <br/>
                    <p>No Data to Display</p>
                </div>
                </>
        )

    } else {


        let time = todaysWorkout.time

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
                    <TableRow key={todaysWorkout.name}>
                        <TableCell component="th" scope="row">
                            {todaysWorkout.workout1}
                        </TableCell>
                        <TableCell align="right">{(todaysWorkout.set1.split(' '))[1]}</TableCell>
                        <TableCell align="right">{(todaysWorkout.set1.split(' '))[3]}</TableCell>
                        <TableCell align="right">{todaysWorkout.weight1 ? todaysWorkout.weight1 : 'None'}</TableCell>
                    </TableRow>
                    {todaysWorkout.workout2 ?
                        <TableRow key={todaysWorkout.name}>
                            <TableCell component="th" scope="row">
                                {todaysWorkout.workout2}
                            </TableCell>
                            <TableCell align="right">{(todaysWorkout.set2.split(' '))[1]}</TableCell>
                            <TableCell align="right">{(todaysWorkout.set2.split(' '))[3]}</TableCell>
                            <TableCell align="right">{todaysWorkout.weight2 ? todaysWorkout.weight2 : 'None'}</TableCell>
                        </TableRow>
                        : <TableRow></TableRow>}
                    {todaysWorkout.workout3 ?
                        <TableRow key={todaysWorkout.name}>
                            <TableCell component="th" scope="row">
                                {todaysWorkout.workout3}
                            </TableCell>
                            <TableCell align="right">{(todaysWorkout.set3.split(' '))[1]}</TableCell>
                            <TableCell align="right">{(todaysWorkout.set3.split(' '))[3]}</TableCell>
                            <TableCell align="right">{todaysWorkout.weight3 ? todaysWorkout.weight3 : 'None'}</TableCell>
                        </TableRow>
                        : <TableRow></TableRow>}
                    {todaysWorkout.workout4 ?
                        <TableRow key={todaysWorkout.name}>
                            <TableCell component="th" scope="row">
                                {todaysWorkout.workout4}
                            </TableCell>
                            <TableCell align="right">{(todaysWorkout.set4.split(' '))[1]}</TableCell>
                            <TableCell align="right">{(todaysWorkout.set4.split(' '))[3]}</TableCell>
                            <TableCell align="right">{todaysWorkout.weight4 ? todaysWorkout.weight4 : 'None'}</TableCell>
                        </TableRow>
                        : <TableRow></TableRow>}
                    {todaysWorkout.workout5 ?
                        <TableRow key={todaysWorkout.name}>
                            <TableCell component="th" scope="row">
                                {todaysWorkout.workout5}
                            </TableCell>
                            <TableCell align="right">{(todaysWorkout.set5.split(' '))[1]}</TableCell>
                            <TableCell align="right">{(todaysWorkout.set5.split(' '))[3]}</TableCell>
                            <TableCell align="right">{todaysWorkout.weight5 ? todaysWorkout.weight5 : 'None'}</TableCell>
                        </TableRow>
                        : <TableRow></TableRow>}
                    {todaysWorkout.workout6 ?
                        <TableRow key={todaysWorkout.name}>
                            <TableCell component="th" scope="row">
                                {todaysWorkout.workout6}
                            </TableCell>
                            <TableCell align="right">{(todaysWorkout.set6.split(' '))[1]}</TableCell>
                            <TableCell align="right">{(todaysWorkout.set6.split(' '))[3]}</TableCell>
                            <TableCell align="right">{todaysWorkout.weight6 ? todaysWorkout.weight6 : 'None'}</TableCell>
                        </TableRow>
                        : <TableRow></TableRow>}
                    {todaysWorkout.workout7 ?
                        <TableRow key={todaysWorkout.name}>
                            <TableCell component="th" scope="row">
                                {todaysWorkout.workout7}
                            </TableCell>
                            <TableCell align="right">{(todaysWorkout.set7.split(' '))[1]}</TableCell>
                            <TableCell align="right">{(todaysWorkout.set7.split(' '))[3]}</TableCell>
                            <TableCell align="right">{todaysWorkout.weight7 ? todaysWorkout.weight7 : 'None'}</TableCell>
                        </TableRow>
                        : <TableRow></TableRow>}
                    {todaysWorkout.workout8 ?
                        <TableRow key={todaysWorkout.name}>
                            <TableCell component="th" scope="row">
                                {todaysWorkout.workout8}
                            </TableCell>
                            <TableCell align="right">{(todaysWorkout.set8.split(' '))[1]}</TableCell>
                            <TableCell align="right">{(todaysWorkout.set8.split(' '))[3]}</TableCell>
                            <TableCell align="right">{todaysWorkout.weight8 ? todaysWorkout.weight8 : 'None'}</TableCell>
                        </TableRow>
                        : <TableRow></TableRow>}

                    </TableBody>
                </Table>
            </TableContainer>
        </div >

)
}
}
