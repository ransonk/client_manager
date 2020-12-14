import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '0.5rem',
        overflowX: 'hidden',
        overflowY: 'hidden',
        height: '20rem',
        '&:hover': {
            overflowY: 'auto',
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
    },
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: 'black',
    },
    time: {
        color: 'blue'
    }
});

export default function TomorrowsClients() {
    const classes = useStyles();

    let allPlansObj = useSelector(state => state.store.todaysPlans)
    let allPlans = Object.values(allPlansObj)
    console.log('hola', allPlans)



    // let date = new Date();
    // let dd = date.getDate();
    // let mm = date.getMonth() + 1;

    // let yyyy = date.getFullYear();
    // if (dd < 10) { dd = '0' + dd }
    // if (mm < 10) { mm = '0' + mm }
    // let date1 = mm + '/' + dd + '/' + yyyy;




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

    let tomorrowslist = allPlans.filter((plan) => {
        let m1 = plan.date.toString().split('/')[0]
        let d1 = plan.date.toString().split('/')[1]

        if (day2 == d1 && mms == m1) {
            return plan
        } else {
            return
        }
    })

    let sortedTomorrowsList = tomorrowslist.map(item => item.time)

    sortedTomorrowsList.sort(function (a, b) {

        return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
    })

    let finalList = [];
    sortedTomorrowsList.forEach(time => {
        tomorrowslist.map(item => {
            if (time === item.time) {
                finalList.push(item)
            }
        })
    })
    console.log('final list?: ', finalList)

    // let times = ['01:00 am', '06:00 pm', '12:00 pm', '03:00 am', '12:00 am'];

    // times.sort(function (a, b) {
    //     return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
    // });
    // console.log('sorted?', times);


    return (

        <div className='today-plan-sched__container'>

            {finalList.length ?

                <Timeline align="alternate">

                    {finalList.map(item => {
                        return (

                            <TimelineItem>
                                <TimelineOppositeContent>
                                    <Typography variant="body2" color="textSecondary" className={classes.time}>
                                        {item.time}
                                    </Typography>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot>
                                        <FitnessCenterIcon />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography variant="h6" component="h1">
                                            {item.clientFirstName + ' ' + item.clientLastName}
                                        </Typography>
                                        <Typography>{item.name}</Typography>
                                    </Paper>
                                </TimelineContent>
                            </TimelineItem>
                        )
                    })
                    }
                </Timeline>
                : <h1>No Workouts Scheduled</h1>}

        </div >

    )
}
