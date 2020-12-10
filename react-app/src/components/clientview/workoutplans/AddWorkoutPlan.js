import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Avatar, Typography, Button, Modal, TextField, MenuItem, Divider, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { fetchClient } from '../../store/users';
// import 'fontsource-roboto';
import clsx from 'clsx';
import { createWorkout } from '../../services/auth';

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
    element: {
        padding: '1rem',
    },
    button: {
        marginTop: '2rem',
    },
    btnContainer: {
        position: 'relative',
        left: '72%',
        bottom: '100%',
    },
    exitBtn: {
        position: 'relative',
        bottom: '1.95rem',
        left: '11rem',
        border: 'none',
        paddingRight: '0px',
        paddingLeft: '0px',
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
    paid: {
        display: 'flex',
        fontSize: '20px'
    },
}));

const CreateNewWorkout = (props) => {
    // const currentUser = useSelector((state) => state.store.current_user)
    // const idd = currentUser.id
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const trainer_id = useSelector((state) => state.store.current_trainer.id)

    const createThisWorkout = async (e) => {
        e.preventDefault();
        const workout = await createWorkout(
            name,
            description,
            trainer_id);
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

    const updateDescription = (e) => {
        setDescription(e.target.value);
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
                        <form className={classes.paper} noValidate autoComplete='off' onSubmit={createThisWorkout}>
                            <Button size='large' variant='contained' onClick={handleCloseModal} className={classes.exitBtn} variant='outlined'>x</Button>
                            <Typography variant='h4' className={classes.editHeading}>
                                Create a Workout
                            </Typography>
                            <TextField id='standard-basic' value={name} onChange={updateName} label='Name of Exercise' autoFocus />
                            <TextField id='standard-basic' value={description} onChange={updateDescription} label='Description' />
                            <Button variant='contained' color='primary' className={classes.button} type='submit'>Submit</Button>
                        </form>
                    </Typography>
                </Fade>
            </Modal>




        </div>
    );
}

export default CreateNewWorkout;
