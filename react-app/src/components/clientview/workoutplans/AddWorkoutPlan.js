import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button, Modal, TextField, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createHistory, createWorkoutPlan } from '../../../services/auth';
import { fetchClient, updateProgress } from '../../../store/users';
import { AddBox } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    paperWidthSm: {
        maxWidth: '800px'

    },
    paper: {
        backgroundColor: 'white',
        outline: '0',
        border: '2px solid white',
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        paddingLeft: '5rem',
        paddingRight: '5rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50rem'

    },
    editHeading: {
        marginBottom: '1rem'
    },
    menuButton: {
        border: 'none',
        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
        fontSize: '16px',
        marginLeft: '-6px',
        backgroundColor: 'secondary',
        borderRadius: '3px',
        "&:hover": {
            backgroundColor: 'white'
        },
        margin: theme.spacing(1),
    },
    exitBtn: {
        position: 'relative',
        bottom: '1.95rem',
        left: '22rem',
        border: 'none',
        paddingRight: '0px',
        paddingLeft: '0px',
        width: '10px',
        color: 'red'
    },
    paid: {
        display: 'flex',
        fontSize: '20px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    inputs: {
        margin: '0.5rem'
    }
}));

const AddWorkoutPlan = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [workout1, setWorkout1] = useState("false");
    const [set1, setSet1] = useState("");
    const [weight1, setWeight1] = useState("")
    const [workout2, setWorkout2] = useState("");
    const [set2, setSet2] = useState("");
    const [weight2, setWeight2] = useState("")
    const [workout3, setWorkout3] = useState("");
    const [set3, setSet3] = useState("");
    const [weight3, setWeight3] = useState("")
    const [workout4, setWorkout4] = useState("");
    const [set4, setSet4] = useState("");
    const [weight4, setWeight4] = useState("")
    const [workout5, setWorkout5] = useState("");
    const [set5, setSet5] = useState("");
    const [weight5, setWeight5] = useState("")
    const [workout6, setWorkout6] = useState("");
    const [set6, setSet6] = useState("");
    const [weight6, setWeight6] = useState("")
    const [workout7, setWorkout7] = useState("");
    const [set7, setSet7] = useState("");
    const [weight7, setWeight7] = useState("")
    const [workout8, setWorkout8] = useState("");
    const [set8, setSet8] = useState("");
    const [weight8, setWeight8] = useState("")
    const [clientFirstName, setClientFirstName] = useState("");
    const [clientLastName, setClientLastName] = useState("");
    const [exerciseHistory, setExerciseHistory] = useState("");

    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))
    let client_id = client.id
    let trainer_id = useSelector(state => state.store.current_trainer.id)

    // console.log('wow')

    const workouts = useSelector((state) => state.store.workouts)
    const sortedWorkouts = Object.values(workouts)
    // console.log('SORTEDWORKOUTS ', sortedWorkouts)
    const intensities = useSelector((state) => state.store.intensities)
    const sortedIntensities = Object.values(intensities)

    //CREATE exerciseHistory object that records points related to line 108

    const pushWorkouts = sortedWorkouts.filter(workout => {
        if (workout.type === 'push') return workout
    })
    const pullWorkouts = sortedWorkouts.filter(workout => {
        if (workout.type === 'pull') return workout
    })

    // console.log('pushWorkouts', pushWorkouts)
    const pushNames = pushWorkouts.map(push => push.name)
    // console.log('pushNames', pushNames)

    useEffect(() => {
        (async () => {
            const client = await fetchClient(client_id)
            setClientFirstName(client.firstName)
            setClientLastName(client.lastName)
        })();
    }, []);


    const createThisWorkoutPlan = async (e) => {
        e.preventDefault();
        let workout1Score = 0;
        let workout2Score = 0;
        let workout3Score = 0;
        let workout4Score = 0;
        let workout5Score = 0;
        let workout6Score = 0;
        let workout7Score = 0;
        let workout8Score = 0;
        // console.log('workout1', workout1)

        if (workout1) {

            let setRepArray = set1.split(' ')
            if (weight1) {
                workout1Score += setRepArray[1] * setRepArray[3] * weight1
            } else {
                workout1Score += setRepArray[1] * setRepArray[3]
            }
        }

        if (workout2) {

            let setRepArray = set2.split(' ')
            if (weight2) {
                workout2Score += setRepArray[1] * setRepArray[3] * weight2
            } else {
                workout2Score += setRepArray[1] * setRepArray[3]
            }
        }

        if (workout3) {

            let setRepArray = set3.split(' ')
            if (weight3) {
                workout3Score += setRepArray[1] * setRepArray[3] * weight3
            } else {
                workout3Score += setRepArray[1] * setRepArray[3]
            }
        }

        if (workout4) {

            let setRepArray = set4.split(' ')
            if (weight4) {
                workout4Score += setRepArray[1] * setRepArray[3] * weight4
            } else {
                workout4Score += setRepArray[1] * setRepArray[3]
            }
        }

        if (workout5) {

            let setRepArray = set5.split(' ')
            if (weight5) {
                workout5Score += setRepArray[1] * setRepArray[3] * weight5
            } else {
                workout5Score += setRepArray[1] * setRepArray[3]
            }
        }

        if (workout6) {

            let setRepArray = set6.split(' ')
            if (weight6) {
                workout6Score += setRepArray[1] * setRepArray[3] * weight6
            } else {
                workout6Score += setRepArray[1] * setRepArray[3]
            }
        }

        if (workout7) {

            let setRepArray = set7.split(' ')
            if (weight7) {
                workout7Score += setRepArray[1] * setRepArray[3] * weight7
            } else {
                workout7Score += setRepArray[1] * setRepArray[3]
            }
        }

        if (workout8) {

            let setRepArray = set8.split(' ')
            if (weight8) {
                workout8Score += setRepArray[1] * setRepArray[3] * weight8
            } else {
                workout8Score += setRepArray[1] * setRepArray[3]
            }
        }


        // console.log('pushCount', pushCount)
        // console.log('pullCount', pullCount)
        // console.log('pushScore', pushScore)
        // console.log('pullScore', pullScore)
        const workoutHistory = await createHistory(
            name,
            workout1,
            workout1Score,
            workout2,
            workout2Score,
            workout3,
            workout3Score,
            workout4,
            workout4Score,
            workout5,
            workout5Score,
            workout6,
            workout6Score,
            workout7,
            workout7Score,
            workout8,
            workout8Score,
            date,
            client_id,
            trainer_id
        )
        // console.log('after dispatch')
        const workoutPlan = await createWorkoutPlan(
            name,
            workout1,
            set1,
            weight1,
            workout2,
            set2,
            weight2,
            workout3,
            set3,
            weight3,
            workout4,
            set4,
            weight4,
            workout5,
            set5,
            weight5,
            workout6,
            set6,
            weight6,
            workout7,
            set7,
            weight7,
            workout8,
            set8,
            weight8,
            time,
            date,
            clientFirstName,
            clientLastName,
            client_id,
            trainer_id
        );
        window.location.reload();
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const updateName = (e) => {
        setName(e.target.value);
    };
    const updateTime = (e) => {
        setTime(e.target.value);
    };
    const updateDate = (e) => {
        setDate(e.target.value);
    };
    const updateWorkout1 = (e) => {
        setWorkout1(e.target.value);
    };

    const updateSet1 = (e) => {
        setSet1(e.target.value);
    };

    const updateWeight1 = (e) => {
        setWeight1(e.target.value);
    }

    const updateWorkout2 = (e) => {
        setWorkout2(e.target.value);
    };

    const updateSet2 = (e) => {
        setSet2(e.target.value);
    };

    const updateWeight2 = (e) => {
        setWeight2(e.target.value);
    }

    const updateWorkout3 = (e) => {
        setWorkout3(e.target.value);
    };

    const updateSet3 = (e) => {
        setSet3(e.target.value);
    };

    const updateWeight3 = (e) => {
        setWeight3(e.target.value);
    }

    const updateWorkout4 = (e) => {
        setWorkout4(e.target.value);
    };

    const updateSet4 = (e) => {
        setSet4(e.target.value);
    };

    const updateWeight4 = (e) => {
        setWeight4(e.target.value);
    }

    const updateWorkout5 = (e) => {
        setWorkout5(e.target.value);
    };

    const updateSet5 = (e) => {
        setSet5(e.target.value);
    };

    const updateWeight5 = (e) => {
        setWeight5(e.target.value);
    }

    const updateWorkout6 = (e) => {
        setWorkout6(e.target.value);
    };

    const updateSet6 = (e) => {
        setSet6(e.target.value);
    };

    const updateWeight6 = (e) => {
        setWeight6(e.target.value);
    }

    const updateWorkout7 = (e) => {
        setWorkout7(e.target.value);
    };

    const updateSet7 = (e) => {
        setSet7(e.target.value);
    };

    const updateWeight7 = (e) => {
        setWeight7(e.target.value);
    }

    const updateWorkout8 = (e) => {
        setWorkout8(e.target.value);
    };

    const updateSet8 = (e) => {
        setSet8(e.target.value);
    };

    const updateWeight8 = (e) => {
        setWeight8(e.target.value);
    }



    return (

        <div className='profile-edit__container'>
            <a className='addWorkoutPlan' onClick={handleOpenModal}>
                <AddBox fontSize='large'/>
            </a>

            <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                maxWidth="md"
                className={classes.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Typography variant='h5'>
                        <form className={classes.paper} noValidate autoComplete='off' onSubmit={createThisWorkoutPlan}>
                            {/* <form className={classes.paper} noValidate autoComplete='off'> */}
                            <Button size='large' variant='contained' onClick={handleCloseModal} className={classes.exitBtn} variant='outlined'>x</Button>
                            <Typography variant='h4' className={classes.editHeading}>
                                Create a Workout
                            </Typography>
                            <Typography className={classes.editHeading}>
                                This workout will automatically be applied to the calendar.
                                <br/>
                                Follow time and date formatting for reliable functionality.
                            </Typography>
                            <span><TextField id='standard-basic' className={classes.inputs} value={name} onChange={updateName} label='Name of Workout Plan' autoFocus />
                                <TextField id='standard-basic' className={classes.inputs} value={time} onChange={updateTime} label='Time: 03:45 pm' />
                                <TextField id='standard-basic' className={classes.inputs} value={date} onChange={updateDate} label='Date: mm/dd/yyyy' /></span>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Workouts</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select" onChange={updateWorkout1}>
                                        <option aria-label="None" value="" />
                                        <optgroup label="Push">
                                            {
                                                pushWorkouts.map((workout, i) => {
                                                    let update = 'updateWorkout'
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                        <optgroup label="Pull">
                                            {
                                                pullWorkouts.map((workout, i) => {
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-select">Sets & Reps</InputLabel>
                                    <Select defaultValue="" id="grouped-select" onChange={updateSet1}>
                                        {
                                            sortedIntensities.map((intensity, i) => {
                                                return (
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets} Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField id='standard-basic' className={classes.inputs} value={weight1} onChange={updateWeight1} label='Weight (lbs)' autoFocus />
                                <br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Workouts</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select" onChange={updateWorkout2}>
                                        <option aria-label="None" value="" />
                                        <optgroup label="Push">
                                            {
                                                pushWorkouts.map((workout, i) => {
                                                    let update = 'updateWorkout'
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                        <optgroup label="Pull">
                                            {
                                                pullWorkouts.map((workout, i) => {
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-select">Sets & Reps</InputLabel>
                                    <Select defaultValue="" id="grouped-select" onChange={updateSet2}>
                                        {
                                            sortedIntensities.map((intensity, i) => {
                                                return (
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets} Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField id='standard-basic' className={classes.inputs} value={weight2} onChange={updateWeight2} label='Weight (lbs)' autoFocus />
                                <br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Workouts</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select" onChange={updateWorkout3}>
                                        <option aria-label="None" value="" />
                                        <optgroup label="Push">
                                            {
                                                pushWorkouts.map((workout, i) => {
                                                    let update = 'updateWorkout'
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                        <optgroup label="Pull">
                                            {
                                                pullWorkouts.map((workout, i) => {
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-select">Sets & Reps</InputLabel>
                                    <Select defaultValue="" id="grouped-select" onChange={updateSet3}>
                                        {
                                            sortedIntensities.map((intensity, i) => {
                                                return (
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets} Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField id='standard-basic' className={classes.inputs} value={weight3} onChange={updateWeight3} label='Weight (lbs)' autoFocus />
                                <br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Workouts</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select" onChange={updateWorkout4}>
                                        <option aria-label="None" value="" />
                                        <optgroup label="Push">
                                            {
                                                pushWorkouts.map((workout, i) => {
                                                    let update = 'updateWorkout'
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                        <optgroup label="Pull">
                                            {
                                                pullWorkouts.map((workout, i) => {
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-select">Sets & Reps</InputLabel>
                                    <Select defaultValue="" id="grouped-select" onChange={updateSet4}>
                                        {
                                            sortedIntensities.map((intensity, i) => {
                                                return (
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets} Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField id='standard-basic' className={classes.inputs} value={weight4} onChange={updateWeight4} label='Weight (lbs)' autoFocus />
                                <br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Workouts</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select" onChange={updateWorkout5}>
                                        <option aria-label="None" value="" />
                                        <optgroup label="Push">
                                            {
                                                pushWorkouts.map((workout, i) => {
                                                    let update = 'updateWorkout'
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                        <optgroup label="Pull">
                                            {
                                                pullWorkouts.map((workout, i) => {
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-select">Sets & Reps</InputLabel>
                                    <Select defaultValue="" id="grouped-select" onChange={updateSet5}>
                                        {
                                            sortedIntensities.map((intensity, i) => {
                                                return (
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets} Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField id='standard-basic' className={classes.inputs} value={weight5} onChange={updateWeight5} label='Weight (lbs)' autoFocus />
                                <br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Workouts</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select" onChange={updateWorkout6}>
                                        <option aria-label="None" value="" />
                                        <optgroup label="Push">
                                            {
                                                pushWorkouts.map((workout, i) => {
                                                    let update = 'updateWorkout'
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                        <optgroup label="Pull">
                                            {
                                                pullWorkouts.map((workout, i) => {
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-select">Sets & Reps</InputLabel>
                                    <Select defaultValue="" id="grouped-select" onChange={updateSet6}>
                                        {
                                            sortedIntensities.map((intensity, i) => {
                                                return (
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets} Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField id='standard-basic' className={classes.inputs} value={weight6} onChange={updateWeight6} label='Weight (lbs)' autoFocus />
                                <br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Workouts</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select" onChange={updateWorkout7}>
                                        <option aria-label="None" value="" />
                                        <optgroup label="Push">
                                            {
                                                pushWorkouts.map((workout, i) => {
                                                    let update = 'updateWorkout'
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                        <optgroup label="Pull">
                                            {
                                                pullWorkouts.map((workout, i) => {
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-select">Sets & Reps</InputLabel>
                                    <Select defaultValue="" id="grouped-select" onChange={updateSet7}>
                                        {
                                            sortedIntensities.map((intensity, i) => {
                                                return (
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets} Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField id='standard-basic' className={classes.inputs} value={weight7} onChange={updateWeight7} label='Weight (lbs)' autoFocus />
                                <br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-native-select">Workouts</InputLabel>
                                    <Select native defaultValue="" id="grouped-native-select" onChange={updateWorkout8}>
                                        <option aria-label="None" value="" />
                                        <optgroup label="Push">
                                            {
                                                pushWorkouts.map((workout, i) => {
                                                    let update = 'updateWorkout'
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                        <optgroup label="Pull">
                                            {
                                                pullWorkouts.map((workout, i) => {
                                                    return (
                                                        <option value={workout.name}>{workout.name}</option>
                                                    )
                                                })
                                            }
                                        </optgroup>
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="grouped-select">Sets & Reps</InputLabel>
                                    <Select defaultValue="" id="grouped-select" onChange={updateSet8}>
                                        {
                                            sortedIntensities.map((intensity, i) => {
                                                return (
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets} Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField id='standard-basic' className={classes.inputs} value={weight8} onChange={updateWeight8} label='Weight (lbs)' autoFocus />
                            </div>
                            <br/>
                            <Button variant='contained' color='primary' className={classes.button} type='submit'>Submit</Button>
                        </form>
                    </Typography>
                </Fade>
            </Dialog>
        </div>
    );
}

export default AddWorkoutPlan;
