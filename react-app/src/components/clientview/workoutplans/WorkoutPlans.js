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
        minWidth: 190,
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
    const dispatch = useDispatch();
    const classes = useStyles();
    const workoutPlans = useSelector((state) => state.store.workoutPlans)
    // console.log('workoutplans', workoutPlans)
    let workoutPlanList = Object.values(workoutPlans)
    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))
    let id = client.id

    // let iterateIds = [];
    // workoutPlanList.map(workout => {
    //     iterateIds.push(workout.id)
    // })


    const handleDeleteWorkoutPlan = async (id) => {
        const deleted = await deleteWorkoutPlan(id)
    }

    useEffect(() => {
        (async () => {

            const workoutplans = await fetchWorkoutPlans(id);
                dispatch(setWorkoutPlans(workoutplans))
        })();

    }, [id])

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
                    //insert select

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
                                    <p className={classes.bold}>{workout.weight1 ? workout.workout1 + ' ( ' + workout.weight1 + ' lbs)' : workout.workout1}</p>
                                    {workout.set1}
                                    <p className={classes.bold}>{workout.weight2 ? workout.workout2 + ' ( ' + workout.weight2 + ' lbs)' : workout.workout2}</p>
                                    {workout.set2}
                                    <p className={classes.bold}>{workout.weight3 ? workout.workout3 + ' ( ' + workout.weight3 + ' lbs)' : workout.workout3}</p>
                                    {workout.set3}
                                    <p className={classes.bold}>{workout.weight4 ? workout.workout4 + ' ( ' + workout.weight4 + ' lbs)' : workout.workout4}</p>
                                    {workout.set4}
                                    <p className={classes.bold}>{workout.weight5 ? workout.workout5 + ' ( ' + workout.weight5 + ' lbs)' : workout.workout5}</p>
                                    {workout.set5}
                                    <p className={classes.bold}>{workout.weight6 ? workout.workout6 + ' ( ' + workout.weight6 + ' lbs)' : workout.workout6}</p>
                                    {workout.set6}
                                    <p className={classes.bold}>{workout.weight7 ? workout.workout7 + ' ( ' + workout.weight7 + ' lbs)' : workout.workout7}</p>
                                    {workout.set7}
                                    <p className={classes.bold}>{workout.weight8 ? workout.workout8 + ' ( ' + workout.weight8 + ' lbs)' : workout.workout8}</p>
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
