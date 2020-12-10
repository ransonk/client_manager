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


const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '0.5rem',
        overflowX: 'hidden',
        overflowY: 'hidden',
        height: '20rem',
        '&:hover': {
            overflowY: 'scroll',
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 0,
    },
    bold: {
        fontWeight: 'bold',
    }
});

export default function SimpleCard() {

    const workoutPlans = useSelector((state) => state.store.workoutplans)
    // console.log('workoutplans', workoutPlans)
    let workoutPlanList = Object.values(workoutPlans)

    // let iterateIds = [];
    // workoutPlanList.map(workout => {
    //     iterateIds.push(workout.id)
    // })






    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div className='workoutplans__container'>
            <AddWorkoutPlan />
            {workoutPlanList.map((workout, i) => {
                // console.log(workout.routinelist[0].name)

                return (

                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {workout.name}
                            </Typography>
                            <Typography className={classes.title}>
                                {workout.date}
                            </Typography>
                            <Typography variant="body2" component="p" className={classes.bold}>
                                {bull}{workout.pull ? 'Pull Day' : 'Push Day'}{bull}
                                <br />
                            </Typography>
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
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>

                )

            })}
        </div>
    );
}
