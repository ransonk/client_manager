import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchWorkoutPlans, setWorkoutPlans } from '../../../store/users';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
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
        marginBottom: 12,
    },
});

export default function SimpleCard() {

    const workoutPlans = useSelector((state) => state.store.workoutplans)
    console.log('workoutplans', workoutPlans)






    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <>
            {/* {workoutPlans.map((workout, i) => {

                return (

                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {workout.name}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {workout.date}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {workout.description}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {workout.pull + ' ' + workout.push}
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>

                )

            })} */}
        </>
    );
}
