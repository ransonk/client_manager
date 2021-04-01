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
import SelectWorkoutPlan from './SelectWorkoutPlan';

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
        minWidth: 200,
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
            <div className='workoutplans__container'>
                <Card className={classes.addWorkoutPlan}>
                    <CardContent>
                        <br />
                        <br />
                        <br />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Create Workout
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
                            Select Workout
                        </Typography>
                        <SelectWorkoutPlan workoutPlanList={workoutPlanList}/>

                    </CardContent>
                </Card>
                {/* <Card className={classes.addWorkoutPlan}>
                    <CardContent>
                        <br />
                        <br />
                        <br />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Build Program
                        </Typography>
                        <SelectWorkoutPlan workoutPlanList={workoutPlanList}/>

                    </CardContent>
                </Card> */}

            </div>
        </>
    );
}
