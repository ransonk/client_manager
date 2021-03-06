import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Logo from "../../images/logan-weaver-apyd8hWmIw0-unsplash\ \(1\).jpg"
import { NavLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
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
    backgroundColor: '#0077b6',
    color: 'white'
  },
  header1: {
    color: theme.palette.primary.main,
    fontFamily: 'Pacifico, cursive',
    fontSize: "180%",
    position: "relative",
    bottom: "1rem",
    color: '#0077b6',
  },
  header2: {
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
    top: '4rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
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
    <Grid container xs={12} md={12} className='login-page__container'>
      <Grid xs={4} md={6} className='login__graphic'></Grid>
      <Grid container xs={12} md={6} className='login__container'>
        <Grid xs={12} md={12} className='login-page__filler'></Grid>
        <Grid xs={2} md={2} className='login-page__filler'></Grid>
        <Grid xs={8} md={8} className='login-page__form'>

          <form onSubmit={onSignUp}>
            <p className={classes.header1}>Create Account</p>
            <div>
              <TextField
                id="standard-basic"
                label="First Name"
                className='form-inputs'
                type="text"
                name="firstName"
                onChange={updateFirstName}
                value={firstName}
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Last Name"
                className='form-inputs'
                type="text"
                name="lastName"
                onChange={updateLastName}
                value={lastName}
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Email"
                className='form-inputs'
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Password"
                className='form-inputs'
                type="password"
                onChange={updatePassword}
                value={password}
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Confirm Password"
                className='form-inputs'
                type="password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              />
            </div>
            <div className={classes.buttons}>
              <Grid xs={2} md={2}></Grid>
              <Grid xs={8} md={8}>
                <Button variant="contained" color="secondary" type="submit" className={classes.signUpBtn}>
                  Sign Up
            </Button>
              </Grid>
              <Grid xs={2} md={2}></Grid>
            </div>
            <NavLink to="/login" exact={true} activeClassName="active" className={classes.login}>
              Return to Login
          </NavLink>
          </form>
        </Grid>
        <Grid xs={2} md={2} className='login-page__filler'></Grid>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
