import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import { fetchWorkouts, setWorkouts } from '../../store/users';
import { deleteWorkout } from '../../services/auth';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    exitBtn: {
        position: 'relative',
        bottom: '0.5rem',
        left: '3rem',
        border: 'none',
        paddingRight: '0px',
        paddingLeft: '0px',
    },
    delete: {
        position: 'relative',
        left: '7rem',
        fontWeight: 'bold',
        "&:hover": {
            cursor: 'pointer'
        }
    }
}));


export default function Workouts() {
    const classes = useStyles();
    const workouts = useSelector((state) => state.store.workouts)

    console.log('workoutsss', workouts)
    let workoutList = Object.values(workouts)
    console.log('list', workoutList)

    const handleDeleteWorkout = async (id) => {
        const deleted = await deleteWorkout(id)
    }

    return (
        <div className={classes.root}>
            {
                workoutList.map((workout, i) => {
                    let panelContent = `panel${i}a-content`
                    let panelHeader = `panel${i}a-header`
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={panelContent}
                                id={panelHeader}
                            // aria-controls='panel1a-content'
                            // id="panel1a-header"
                            >
                                <Typography className={classes.heading}>{workout.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {workout.description}
                                </Typography>
                                {/* <Button size='large' variant='contained' onClick={() => handleDeleteWorkout(workout.id)} className={classes.exitBtn} variant='outlined'>x</Button> */}
                            </AccordionDetails>
                            <AccordionDetails>
                                <Typography className={classes.delete} onClick={() => handleDeleteWorkout(workout.id)}>
                                    Delete
                                </Typography>
                                {/* <Button size='large' variant='contained' onClick={() => handleDeleteWorkout(workout.id)} className={classes.exitBtn} variant='outlined'>x</Button> */}
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </div>
    );
}
