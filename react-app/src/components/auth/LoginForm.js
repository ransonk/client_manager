import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';
import theme from '../../theme';
import Logo from "../../images/logan-weaver-apyd8hWmIw0-unsplash\ \(1\).jpg"
import { NavLink } from 'react-router-dom';
import { demoTrainerLogin } from '../../services/auth';


const useStyles = makeStyles((theme) => ({
  root: {

  },
  loginBtn: {
    position: "relative",
    backgroundColor: '#0077b6',
    color: 'white'

  },
  demoBtn: {
    position: "relative",
    backgroundColor: '#e5989b',
    color: 'white'

  },
  header1: {
    color: '#bde0fe',
    fontFamily: 'Pacifico, cursive',
    fontSize: "180%",
    position: "relative",
    bottom: "1rem"
  },
  header2: {
    position: "relative",
    right: "4rem",
    bottom: "5rem"
  },
  loginForm: {
    display: 'block',
    position: 'relative',
    textAlign: 'center'
  },
  signUp: {
    marginTop: '1rem',
    position: 'relative',
    top: '1rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  buttons2: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const classes = useStyles();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoPassword, setDemoPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    setEmail('demo@aa.io')
    setPassword('demo')
    const user = await demoTrainerLogin(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
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

          <form className={classes.loginForm} onSubmit={onLogin}>
            <p className={classes.header1}>Trainer Hub</p>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <TextField
                className='form-inputs'
                id="standard-basic"
                label="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <TextField
                className='form-inputs'
                id="standard-basic"
                label="Password"
                type="password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className={classes.buttons}>
              <Grid xs={2} md={2}></Grid>
              <Grid xs={8} md={8}>
                <Button variant="contained" color="secondary" type="submit" className={classes.loginBtn}>
                  Sign in
                </Button>
              </Grid>
              <Grid xs={2} md={2}></Grid>
            </div>
            <div className={classes.buttons2}>
              <Grid xs={2} md={2}></Grid>
              <Grid xs={8} md={8}>
                <Button variant="contained" color="secondary" onClick={demoLogin} className={classes.demoBtn}>
                  Demo
                </Button>
              </Grid>
              <Grid xs={2} md={2}></Grid>
            </div>

            <div>

              <NavLink to="/sign-up" exact={true} activeClassName="active" className={classes.signUp}>
                Sign Up
          </NavLink>
            </div>
          </form>

        </Grid>
        <Grid xs={2} md={2} className='login-page__filler'></Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
