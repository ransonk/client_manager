import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

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


const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        maxHeight: '400px',
        overflowY: 'auto'
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
        </div>
    );
}
