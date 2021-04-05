import React from 'react';
import { useSelector } from "react-redux";
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
import theme from '../theme';



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
    },
    root2: {
        height: '30rem',
        width: '30rem'
    },
    wrapper: {
        width: 100 + theme.spacing(2),
    },
    paper2: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    noWorkouts: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '1rem',
        width: '100%',
    },
    ptag: {
        color: 'white',
    }
});

export default function TodaysClients() {
    const classes = useStyles();
    const [checked] = React.useState(false);

    let allPlansObj = useSelector(state => state.store.todaysPlans)
    let allPlans = Object.values(allPlansObj)


    const today = new Date()
    let month = today.toString().split(' ')[1]
    let day1 = today.toString().split(' ')[2]


    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)


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

    let todayslist = allPlans.filter((plan) => {
        let m1 = plan.date.toString().split('/')[0]
        let d1 = plan.date.toString().split('/')[1]

        if (day1 === d1 && mms === m1) {
            return plan
        }
    })

    let sortedTodaysList = todayslist.map(item => item.time)

    sortedTodaysList.sort(function (a, b) {

        return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
    })
    let finalList = [];
    sortedTodaysList.forEach(time => {
        todayslist.map(item => {
            if (time === item.time) {
                finalList.push(item)
            }
        })
    })



    return (



        <div className={(checked === false) ? 'today-plan-sched__container' : 'today-plan-sched__container-hidden'}>

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
                : <Timeline align="alternate">

                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary" className={classes.time}>
                                8:00 am
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
                                    John Martinez
                                    </Typography>
                                <Typography>Upper Body Workout</Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary" className={classes.time}>
                                10:00 am
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
                                    Eliza Reynolds
                                    </Typography>
                                <Typography>Leg Day</Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary" className={classes.time}>
                                3:00 pm
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
                                    Daniel Lee
                                    </Typography>
                                <Typography>Pull Day (Back)</Typography>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>

                </Timeline>}

        </div >
    )
}
