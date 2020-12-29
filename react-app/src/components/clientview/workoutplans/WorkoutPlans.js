import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchWorkoutPlans, setWorkoutPlans } from '../../../store/users';
import AddWorkoutPlan from './AddWorkoutPlan';
import { Divider } from '@material-ui/core';
import { deleteWorkoutPlan } from '../../../services/auth';


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
    addWorkoutPlan: {
        minWidth: 275,
        margin: '0.5rem',
        height: '20rem',
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
        marginBottom: '1rem',
        "&:hover": {
            cursor: 'pointer'
        }
    },
});

export default function SimpleCard() {

    const classes = useStyles();
    const workoutPlans = useSelector((state) => state.store.workoutplans)
    // console.log('workoutplans', workoutPlans)
    let workoutPlanList = Object.values(workoutPlans)

    // let iterateIds = [];
    // workoutPlanList.map(workout => {
    //     iterateIds.push(workout.id)
    // })


    const handleDeleteWorkoutPlan = async (id) => {
        const deleted = await deleteWorkoutPlan(id)
    }

    return (
        <>
            {/* <AddWorkoutPlan /> */}
            <div className='workoutplans__container'>
                <Card className={classes.addWorkoutPlan}>
                    <CardContent>
                        <br />
                        <br />
                        <br />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Add Workout Plan
                        </Typography>
                        <AddWorkoutPlan />

                    </CardContent>
                </Card>
                {workoutPlanList.map((workout, i) => {
                    // console.log(workout.routinelist[0].name)comment

                    return (

                        <Card className={classes.root}>
                            <CardContent>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {workout.name}
                                </Typography>
                                <Typography>
                                    Date: <span className={classes.title}>{workout.date}</span>
                                </Typography>
                                <Typography>
                                    Time: <span className={classes.title}>{workout.time}</span>
                                </Typography>
                                <br />
                                <Divider />
                                <br />
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
                                {/* </Typography> */}
                            </CardContent>
                            <Typography className={classes.delete} onClick={() => handleDeleteWorkoutPlan(workout.id)}>
                                Delete
                                </Typography>
                        </Card>

                    )

                })}
            </div>
        </>
    );
}
