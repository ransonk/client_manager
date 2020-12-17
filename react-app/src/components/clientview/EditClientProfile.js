import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Avatar, Typography, Button, Modal, TextField, MenuItem, Divider, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { fetchClient } from '../../store/users';
import clsx from 'clsx';


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
        position: 'relative',
        bottom: '5rem',
        fontFamily: 'Roboto',
        fontSize: '16px',
        marginLeft: '-6px',
        backgroundColor: 'white',
        borderRadius: '3px',
        "&:hover": {
            backgroundColor: 'lightgray'
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
    deleteBtn: {
        position: 'relative',
        bottom: '4rem',
        right: '9rem',
        border: 'none',
        paddingRight: '0px',
        paddingLeft: '0px',
        color: 'red',
        fontFamily: 'Calibri'
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
    }
}));

const EditClientProfile = (props) => {
    // const currentUser = useSelector((state) => state.store.current_user)
    // const idd = currentUser.id
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [duedate, setDueDate] = useState("");
    const [amount, setAmount] = useState("");
    const [paid, setPaid] = useState();
    const [noshows, setNoShows] = useState();
    const [cancellations, setCancellations] = useState();
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))
    let id = client.id
    let secureClient;

    useEffect(() => {
        (async () => {

            secureClient = await fetchClient(id);
            setFirstName(secureClient.firstName)
            setLastName(secureClient.lastName)
            setPhone(secureClient.phone)
            setEmail(secureClient.email)
            setPaid(secureClient.paid)
            setDueDate(secureClient.duedate)
            setAmount(secureClient.amount)
            setWeight(secureClient.weight)
            setAge(secureClient.age)
            setNoShows(secureClient.noshows)
            setCancellations(secureClient.cancellations)
        })();
    }, []);




    const updateClientProfile = async () => {
        if (password !== repeatPassword) return alert('Passwords must match.')
        const response = await fetch(`/api/trainers/client/${id}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, phone, weight, age, duedate, amount, paid, noshows, cancellations, password }),
        });
        if (response.ok) {
            window.location.reload()
        }
    };

    const handleDeleteClient = async () => {
        if (window.confirm('Are you sure you want do delete this client? This action is irreversible and all data associated with this client will be lost')) {


            const response = await fetch(`/api/trainers/delete-client/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resJSON = await response.json();
            if (resJSON.message === "delete successful") {
                window.location.href = '/';
            }
        }
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const updateLastName = (e) => {
        setLastName(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePhone = (e) => {
        setPhone(e.target.value);
    };

    const updateWeight = (e) => {
        setWeight(e.target.value);
    };

    const updateAge = (e) => {
        setAge(e.target.value);
    };

    const updateDueDate = (e) => {
        setDueDate(e.target.value);
    };

    const updateAmount = (e) => {
        setAmount(e.target.value);
    };

    const updateNoShows = (e) => {
        setNoShows(e.target.value);
    };

    const updateCancellations = (e) => {
        setCancellations(e.target.value);
    };

    const updatePaid = (e) => {
        if (e.target.checked) {
            setPaid(true)
        } else {
            setPaid(false)
        }
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };




    return (

        <div className='profile-edit__container'>

            <p className='editProfile' onClick={handleOpenModal}>
                Edit Profile
            </p>
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
                        <form className={classes.paper} noValidate autoComplete='off' onSubmit={updateClientProfile}>
                            <Button size='large' variant='contained' onClick={handleCloseModal} className={classes.exitBtn} variant='outlined'>x</Button>
                            <Button size='large' variant='contained' onClick={handleDeleteClient} className={classes.deleteBtn} variant='outlined'>Delete Client</Button>
                            <Typography variant='h4' className={classes.editHeading}>
                                Edit Client Profile
                            </Typography>
                            <TextField id='standard-basic' value={firstName} onChange={updateFirstName} label='First Name' autoFocus />
                            <TextField id='standard-basic' value={lastName} onChange={updateLastName} label='Last Name' />
                            <TextField id='standard-basic' value={email} onChange={updateEmail} label='Email' />
                            <TextField id='standard-basic' value={phone} onChange={updatePhone} label='Phone' />
                            <TextField id='standard-basic' value={weight} onChange={updateWeight} label='Weight' />
                            <TextField id='standard-basic' value={age} onChange={updateAge} label='Age' />
                            <TextField id='standard-basic' value={duedate} onChange={updateDueDate} label='DueDate' />
                            <TextField id='standard-basic' value={amount} onChange={updateAmount} label='Amount $' />
                            <TextField id='standard-basic' value={noshows} onChange={updateNoShows} label='No Shows' />
                            <TextField id='standard-basic' value={cancellations} onChange={updateCancellations} label='Cancellations' />
                            <TextField id='standard-basic' type='password' onChange={updatePassword} label='Password' />
                            <TextField id='standard-basic' type='password' onChange={updateRepeatPassword} label='Repeat Password' />
                            <div className={classes.paid}>

                                <p>Paid</p>
                                <Checkbox
                                    className={classes.root}
                                    checked={paid}
                                    disableRipple
                                    color="default"
                                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                    icon={<span className={classes.icon} />}
                                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                                    {...props}
                                    onChange={updatePaid}
                                />
                            </div>
                            <Button variant='contained' color='primary' className={classes.button} type='submit'>Submit</Button>
                        </form>
                    </Typography>
                </Fade>
            </Modal>




        </div>
    );
}

export default EditClientProfile;
