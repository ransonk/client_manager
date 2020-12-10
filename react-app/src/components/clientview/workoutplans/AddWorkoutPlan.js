import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Typography, Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createWorkoutPlan } from '../../../services/auth';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

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
        fontFamily: 'Roboto',
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
        left: '11rem',
        border: 'none',
        paddingRight: '0px',
        paddingLeft: '0px',
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
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [workout1, setWorkout1] = useState("false");
    const [set1, setSet1] = useState("");
    const [workout2, setWorkout2] = useState("");
    const [set2, setSet2] = useState("");
    const [workout3, setWorkout3] = useState("");
    const [set3, setSet3] = useState("");
    const [workout4, setWorkout4] = useState("");
    const [set4, setSet4] = useState("");
    const [workout5, setWorkout5] = useState("");
    const [set5, setSet5] = useState("");
    const [workout6, setWorkout6] = useState("");
    const [set6, setSet6] = useState("");
    const [workout7, setWorkout7] = useState("");
    const [set7, setSet7] = useState("");
    const [workout8, setWorkout8] = useState("");
    const [set8, setSet8] = useState("");

    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))
    let client_id = client.id

    const workouts = useSelector((state) => state.store.workouts)
    const sortedWorkouts = Object.values(workouts)
    const intensities = useSelector((state) => state.store.intensities)
    const sortedIntensities = Object.values(intensities)

    const pushWorkouts = sortedWorkouts.filter(workout => {
        if (workout.type === 'push') return workout
    })
    const pullWorkouts = sortedWorkouts.filter(workout => {
        if (workout.type === 'pull') return workout
    })

    let description =
        `${workout1} ${set1}
    ${workout2} ${set2}
    ${workout3} ${set3}
    ${workout4} ${set4}
    ${workout5} ${set5}
    ${workout6} ${set6}
    ${workout7} ${set7}
    ${workout8} ${set8} `

    // console.log(description)


    const createThisWorkoutPlan = async (e) => {
        e.preventDefault();
        const workoutPlan = await createWorkoutPlan(
            name,
            description,
            client_id
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

    const updateWorkout2 = (e) => {
        setWorkout2(e.target.value);
    };

    const updateSet2 = (e) => {
        setSet2(e.target.value);
    };

    const updateWorkout3 = (e) => {
        setWorkout3(e.target.value);
    };

    const updateSet3 = (e) => {
        setSet3(e.target.value);
    };

    const updateWorkout4 = (e) => {
        setWorkout4(e.target.value);
    };

    const updateSet4 = (e) => {
        setSet4(e.target.value);
    };

    const updateWorkout5 = (e) => {
        setWorkout5(e.target.value);
    };

    const updateSet5 = (e) => {
        setSet5(e.target.value);
    };

    const updateWorkout6 = (e) => {
        setWorkout6(e.target.value);
    };

    const updateSet6 = (e) => {
        setSet6(e.target.value);
    };

    const updateWorkout7 = (e) => {
        setWorkout7(e.target.value);
    };

    const updateSet7 = (e) => {
        setSet7(e.target.value);
    };

    const updateWorkout8 = (e) => {
        setWorkout8(e.target.value);
    };

    const updateSet8 = (e) => {
        setSet8(e.target.value);
    };



    return (

        <div className='profile-edit__container'>

            <a className='addWorkoutPlan' onClick={handleOpenModal}>
                +
            </a>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                                Create a Workout Plan
                            </Typography>
                            <span><TextField id='standard-basic' className={classes.inputs} value={name} onChange={updateName} label='Name of Workout Plan' autoFocus />
                                <TextField id='standard-basic' className={classes.inputs} value={time} onChange={updateTime} label='Time' />
                                <TextField id='standard-basic' className={classes.inputs} value={date} onChange={updateDate} label='Date' /></span>
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
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets}, Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets}, Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets}, Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets}, Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets}, Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets}, Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets}, Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
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
                                                    <MenuItem value={'Sets: ' + intensity.sets + ' ' + 'Reps: ' + intensity.reps}>Sets: {intensity.sets}, Reps: {intensity.reps} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <Button variant='contained' color='primary' className={classes.button} type='submit'>Submit</Button>
                        </form>
                    </Typography>
                </Fade>
            </Modal>




        </div>
    );
}

export default AddWorkoutPlan;
