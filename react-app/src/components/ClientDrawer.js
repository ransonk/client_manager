import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DirectionsRunTwoTone from '@material-ui/icons/DirectionsRunTwoTone';
import { Typography, Modal, TextField } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { createClient } from '../services/auth';




const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
        backgroundColor: '#24364e',
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      nested: {
        paddingLeft: theme.spacing(4),
      },
    fullList: {
        width: 'auto',
        backgroundColor: '#24364e'
    },
    paperAnchorLeft: {
        backgroundColor: '#24364e',
        color: "blue"

    },
    title: {
        color: 'white',
        fontWeight: 'bold',
    },
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
        // boxShadow: theme.shadows[5],
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
        fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
        fontSize: '16px',
        marginLeft: '-6px',
        backgroundColor: 'secondary',
        borderRadius: '3px',
        "&:hover": {
            backgroundColor: 'white'
        },
        // margin: theme.spacing(1),
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
        left: '10rem',
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
    radio: {
        marginTop: '1.5rem',
    }
}));

export default function ClientDrawer({ authenticated, setAuthenticated, props, clientView, setClientView, selectedClient, setSelectedClient }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const [openModal, setOpenModal] = React.useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [duedate, setDueDate] = useState("");
    const [amount, setAmount] = useState("");
    const [paid, setPaid] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    // const [state, setState] = React.useState({
    //     top: false,
    //     left: true,
    //     bottom: false,
    //     right: false,
    // });
    const trainer_id = useSelector((state) => state.store.current_trainer.id)
    const clients = useSelector((state) => state.store.clients)
    if (!clients) return null;

    let clientsArray = Object.values(clients)

    // const toggleDrawer = (anchor, open) => (event) => {
    //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }

    //     setState({ ...state, [anchor]: open });
    // };



    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const user = await createClient(
                firstName,
                lastName,
                email,
                phone,
                weight,
                age,
                duedate,
                amount,
                paid,
                password,
                trainer_id);
            window.location.href = "/";
        } else {
            alert('Form information invalid')
        }
    };

    const handleOpenModal = (e) => {
        e.stopPropagation()
        setOpenModal(true);
    };

    const handleCloseModal = (e) => {
        e.stopPropagation()
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

    if (authenticated) {
        return <Redirect to="/" />;
    }


    //Grabs list of clients for display in drawer


    const handlePress = async (id) => {
        setSelectedClient(id)
        setClientView(true)
        let currentClientList = clientsArray.filter(client => {
            if (client.id === id) return client;
        })
        // console.log(currentClientList['0'])
        let currentClient = currentClientList[0]
        localStorage.setItem('CURRENT_CLIENT', JSON.stringify(currentClient))
        //******************************************* */
        // window.location.href = '/manage-client'
        //commented out above line to verify that application will work despite the reroute
    }

    const myStyle = {
        backgroundColor: "green",
        // color: "red",
        padding: "10px"
    }

    const handleClick = () => {
        setOpen(!open);
      };

    // const list = (anchor) => (
    //     <div
    //         className={clsx(classes.list, {
    //             [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    //         })}
    //         role="presentation"
    //         onClick={toggleDrawer(anchor, false)}
    //         onKeyDown={toggleDrawer(anchor, false)}
    //     >
    //         <List className={classes.title}>
    //             {['Current Clients'].map((text) => (
    //                 <ListItem button key={text}>
    //                     <ListItemIcon><ArrowDownward /></ListItemIcon>
    //                     <ListItemText primary={text} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <Divider variant="middle" />
    //         <List>
    //             {clientsArray.map(({ firstName, lastName, id }) => (
    //                 <ListItem button key={id} onClick={() => handleClick(id)}>
    //                     <ListItemIcon><DirectionsRunTwoTone /></ListItemIcon>
    //                     <ListItemText primary={firstName + ' ' + lastName} />
    //                 </ListItem>
    //             ))}
    //         </List>
    //         <a className='addClient' onClick={handleOpenModal}>
    //             +
    //         </a>
    //     </div>
    // );


    return (
        <>
            <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Current Clients
        </ListSubheader>
      }
      className={classes.root}
    >
      {clientsArray.map(({ firstName, lastName, id }) => (
                    <ListItem
                    divider
                    button
                    key={id}
                    className={`client-${id}`}
                    style={id === selectedClient ? myStyle : null }
                    onClick={() => handlePress(id)}>

                        <ListItemText primary={firstName + ' ' + lastName} />
                        <ListItemIcon><DirectionsRunTwoTone /></ListItemIcon>
                    </ListItem>
                ))}
    </List>
            <div className='profile-edit__container'>

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
                    closeAfterTransition
                >
                    <Fade in={openModal}>
                        <Typography variant='h5'>
                            <form className={classes.paper} noValidate autoComplete='off' onSubmit={onSignUp}>
                                <Button size='large' variant='contained' onClick={handleCloseModal} className={classes.exitBtn} variant='outlined'>x</Button>
                                <Typography variant='h4' className={classes.editHeading}>
                                    Create a Client
                            </Typography>
                                <TextField id='standard-basic' value={firstName} onChange={updateFirstName} label='First Name' autoFocus />
                                <TextField id='standard-basic' value={lastName} onChange={updateLastName} label='Last Name' />
                                <TextField id='standard-basic' value={email} onChange={updateEmail} label='Email' />
                                <TextField id='standard-basic' value={phone} onChange={updatePhone} label='Phone' />
                                <TextField id='standard-basic' value={weight} onChange={updateWeight} label='Weight' />
                                <TextField id='standard-basic' value={age} onChange={updateAge} label='Age' />
                                <TextField id='standard-basic' value={duedate} onChange={updateDueDate} label='Due Date' />
                                <TextField id='standard-basic' value={amount} onChange={updateAmount} label='Amount' />
                                <TextField id='standard-basic' type="password" value={password} onChange={updatePassword} label='Password' />
                                <TextField id='standard-basic' type="password" value={repeatPassword} onChange={updateRepeatPassword} label='Repeat Password' />
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
        </>
    );
}
