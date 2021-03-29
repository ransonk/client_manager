import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import { fetchWorkouts, setWorkouts } from '../../store/users';
import { deleteWorkout } from '../../services/auth';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  function createData(push, pull) {
    return { push, pull };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
    },
    table: {
        // minWidth: 700,
        // maxHeight: 100,
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
        color: '#e63946',
        left: '0.5rem',
        fontWeight: 'bold',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    type: {
        color: 'gray',
        fontSize: '14px'
    }
}));


export default function Workouts() {
    const classes = useStyles();
    const workouts = useSelector((state) => state.store.workouts)
    // console.log('workoutsss', workouts)
    let workoutList = Object.values(workouts)
    let pushExercises = [];
    let pullExercises = [];
    let combinedExerciseList = [];

    workoutList.map(exercise => {
        if (exercise.type === "push") {
            pushExercises.push([exercise.name, exercise.id])
        } else {
            pullExercises.push([exercise.name, exercise.id])
        }
    });


    const handleDeleteWorkout = async (id) => {
        const deleted = await deleteWorkout(id)
    }

    if (pushExercises.length > pullExercises.length) {
        for (let i = 0; i < pushExercises.length; i++) {
            if(pullExercises[i]) {
                  combinedExerciseList.push(createData(pushExercises[i], pullExercises[i]))
                } else {
                  combinedExerciseList.push(createData(pushExercises[i], ''))
              }
        }
    } else {
        for (let i = 0; i < pullExercises.length; i++) {
            if(pushExercises[i]) {
                combinedExerciseList.push(createData(pushExercises[i], pullExercises[i]))
            } else {
                combinedExerciseList.push(createData('', pullExercises[i]))
            }
        }
    }



    console.log('combined???', combinedExerciseList)


    return (
        <div className={classes.root}>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Push</StyledTableCell>
                        <StyledTableCell align="right">Pull</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {combinedExerciseList.map((exercise) => (
                        <StyledTableRow key={exercise.push}>
                        <StyledTableCell component="th" scope="row">
                            {exercise.push[0]}
                            {
                                exercise.push[0] ?
                            <span className={classes.delete} onClick={() => handleDeleteWorkout(exercise.push[1])}>
                                    x
                                </span>
                                : ""
                            }
                        </StyledTableCell>
                        <StyledTableCell align="right">{exercise.pull[0]}
                                {
                                    exercise.pull[0] ?
                        <span className={classes.delete} onClick={() => handleDeleteWorkout(exercise.pull[1])}>
                                    x

                                </span>
                                : ""
                                }
                                </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>






            {/* {
                workoutList.map((workout, i) => {
                    let panelContent = `panel${i}a-content`
                    let panelHeader = `panel${i}a-header`
                    return (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={panelContent}
                                id={panelHeader}
                            >
                                <Typography className={classes.heading}>{workout.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.type}>
                                    (Type: {workout.type})
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Typography className={classes.delete} onClick={() => handleDeleteWorkout(workout.id)}>
                                    Delete
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            } */}
        </div>
    );
}
