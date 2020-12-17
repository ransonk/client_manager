import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Logo from "../../images/logan-weaver-apyd8hWmIw0-unsplash\ \(1\).jpg"
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: '3px solid black',
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'blue',
    // height: 48,
    // padding: '0 30px',
  },
  inputs: {
    alignContent: "center",
    width: "50%",
    position: 'relative',
    right: '4.4rem',
    top: '4rem',
    backgroundColor: 'white'
  },
  inputs2: {
    alignContent: "center",
    width: "50%",
    marginBottom: "0.5rem",
    position: 'relative',
    right: '4.4rem',
    top: '4rem',
    backgroundColor: 'white'
  },
  signUpBtn: {
    position: "relative",
    top: "6rem",
    right: "18rem",
    width: "10rem",
    backgroundColor: '#0077b6',
    color: 'white',
    top: '10rem'
    // alignContent: "center"
    // textAlign: "center"
  },
  header1: {
    color: theme.palette.primary.main,
    fontFamily: 'Pacifico, cursive',
    fontSize: "3rem",
    position: "relative",
    // right: "4rem",
    bottom: "1rem",
    right: "5.5rem",
    color: '#0077b6',
    top: '3rem'
  },
  header2: {
    // color: theme.palette.primary.main,
    position: "relative",
    right: "4rem",
    bottom: "5rem"
  },
  loginForm: {
    position: "relative",
    right: "2rem",
    bottom: "20rem"
  },
  login: {
    position: "relative",
    left: "6rem",
    top: '4rem'
  }
}));

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(firstName, lastName, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
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

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className='signup-page__container'>
      <div className='signup__graphic'>
        <img src={Logo} width='100%'></img>
      </div>
      <div className='signup__container'>
        <Container maxWidth="sm" className={classes.border}>
          <form onSubmit={onSignUp}>
            <p className={classes.header1}>Create Account</p>
            <div>
              {/* <label>First Name</label> */}
              <TextField
                id="standard-basic"
                label="First Name"
                className={classes.inputs}
                type="text"
                name="firstName"
                onChange={updateFirstName}
                value={firstName}
              />
            </div>
            <div>
              {/* <label>Last Name</label> */}
              <TextField
                id="standard-basic"
                label="Last Name"
                className={classes.inputs}
                type="text"
                name="lastName"
                onChange={updateLastName}
                value={lastName}
              />
            </div>
            <div>
              {/* <label>Email</label> */}
              <TextField
                id="standard-basic"
                label="Email"
                className={classes.inputs}
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              />
            </div>
            <div>
              {/* <label>Password</label> */}
              <TextField
                id="standard-basic"
                label="Password"
                className={classes.inputs}
                type="password"
                onChange={updatePassword}
                value={password}
              />
            </div>
            <div>
              {/* <label>Repeat Password</label> */}
              <TextField
                id="standard-basic"
                label="Confirm Password"
                className={classes.inputs2}
                type="password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              />
              <Button variant="contained" color="secondary" type="submit" className={classes.signUpBtn}>
                Sign Up
            </Button>
            </div>
            <NavLink to="/login" exact={true} activeClassName="active" className={classes.login}>
              Return to Login
          </NavLink>
          </form>
        </Container >
      </div >
    </div>
  );
};

export default SignUpForm;
