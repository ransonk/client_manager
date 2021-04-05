import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CloneWorkoutPlan from './CloneWorkoutPlan';
import { deleteWorkoutPlan } from '../../../services/auth';
import {Apps} from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        maxWidth: 200,
        margin: '0.5rem',
        width: 'auto',
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
        marginTop: '5px'
    },
    delete: {
        position: 'relative',
        color: '#e63946',
        fontWeight: 'bold',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    modify: {
        color: 'blue',
    },
    clone: {
        color: 'blue',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    dialogFooter: {
        display: 'flex',
        justifyContent: 'center'
    }
});

function SelectWorkoutPlan({workoutPlanList}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleDeleteWorkoutPlan = async (id) => {
        const deleted = await deleteWorkoutPlan(id)
    }

    const createClone = async (id) => {
        localStorage.setItem('CURRENT_PLAN', 'id')
    }

    return (
        <div className='select-workout__container'>
            <a className='select-workout-plan__button'>
                <Apps fontSize='large' onClick={handleClickOpen}/>
            </a>




            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select a Workout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select an existing workout to reschedule or delete!
          </DialogContentText>
          <div className='workout-plan-menu'>

          {workoutPlanList.map((workout, i) => {

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
                                <div className={classes.buttonContainer}>
                            <Typography className={classes.clone}>
                                <CloneWorkoutPlan cloneId={workout.id}/>
                                </Typography>


                            <Typography className={classes.delete} onClick={() => handleDeleteWorkoutPlan(workout.id)}>
                                Delete
                                </Typography>

                                </div>
                                <Divider />
                                <br />
                                <div>
                                    <p className={classes.bold}>{workout.weight1 ? workout.workout1 + ' (' + workout.weight1 + ' lbs)' : workout.workout1}</p>
                                    {workout.set1}
                                    <p className={classes.bold}>{workout.weight2 ? workout.workout2 + ' (' + workout.weight2 + ' lbs)' : workout.workout2}</p>
                                    {workout.set2}
                                    <p className={classes.bold}>{workout.weight3 ? workout.workout3 + ' (' + workout.weight3 + ' lbs)' : workout.workout3}</p>
                                    {workout.set3}
                                    <p className={classes.bold}>{workout.weight4 ? workout.workout4 + ' (' + workout.weight4 + ' lbs)' : workout.workout4}</p>
                                    {workout.set4}
                                    <p className={classes.bold}>{workout.weight5 ? workout.workout5 + ' (' + workout.weight5 + ' lbs)' : workout.workout5}</p>
                                    {workout.set5}
                                    <p className={classes.bold}>{workout.weight6 ? workout.workout6 + ' (' + workout.weight6 + ' lbs)' : workout.workout6}</p>
                                    {workout.set6}
                                    <p className={classes.bold}>{workout.weight7 ? workout.workout7 + ' (' + workout.weight7 + ' lbs)' : workout.workout7}</p>
                                    {workout.set7}
                                    <p className={classes.bold}>{workout.weight8 ? workout.workout8 + ' (' + workout.weight8 + ' lbs)' : workout.workout8}</p>
                                    {workout.set8}
                                </div>
                            </CardContent>
                        </Card>

)

                })}
</div>
        </DialogContent>
        <DialogActions className={classes.dialogFooter}>
          <Button onClick={handleClose} className={classes.delete}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default SelectWorkoutPlan;
