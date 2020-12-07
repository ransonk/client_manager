import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fetchWorkouts, setWorkouts } from '../../store/users';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function SimpleAccordion() {
    const classes = useStyles();
    const workouts = useSelector((state) => state.store.workouts)

    console.log('workoutsss', workouts)
    let workoutList = Object.values(workouts)
    console.log('list', workoutList)



    const workoutAccordion = () => {
        return (

            <div className={classes.root}>
                {
                    workoutList.map((workout, i) => {
                        return (
                            <>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls='panel1a-content'
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>{workout.name}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {workout.description}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        )
                    })
                }
            </div>




        )
    }


    return (
        <>

            {workoutAccordion}
            {/* <h1> hello </h1> */}
        </>
    )
}
