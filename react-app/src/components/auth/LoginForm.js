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
    width: "70%",
    position: 'relative',
    left: '1rem',
    backgroundColor: 'white',
  },
  inputs2: {
    alignContent: "center",
    width: "70%",
    marginBottom: "0.5rem",
    position: 'relative',
    left: '1rem',
    backgroundColor: 'white'
  },
  loginBtn: {
    position: "relative",
    top: "4rem",
    right: "4rem",
    width: "30%",
    minWidth: "30%",
    backgroundColor: '#0077b6',
    color: 'white'
    // alignContent: "center"
    // textAlign: "center"
  },
  demoBtn: {
    position: "relative",
    top: '7rem',
    right: '6rem',
    // bottom: "27rem",
    // left: "29rem",
    width: "10rem",
    backgroundColor: '#e5989b',
    color: 'white'
    // alignContent: "center"
    // textAlign: "center"
  },
  header1: {
    color: '#bde0fe',
    fontFamily: 'Pacifico, cursive',
    fontSize: "50%",
    position: "relative",
    // right: "4rem",
    bottom: "1rem"
  },
  header2: {
    // color: theme.palette.primary.main,
    position: "relative",
    right: "4rem",
    bottom: "5rem"
  },
  loginForm: {
    position: "relative",
    right: "4rem",
    bottom: "5rem"
  },
  signUp: {
    position: "relative",
    left: "12rem",
    bottom: '1rem'
  },
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
    // window.location.reload();
    // fix this it needs to be like logging you in correctly.
    //when you log in it thinks ur the last user!!
  }



  return (
    <Grid container xs={12} md={12} className='login-page__container'>
      <Grid xs={6} md={6} className='login__graphic'>
        {/* <img src={Logo} width='100%'></img> */}
      </Grid>
      <Grid xs={6} md={6} className='login__container'>
        <div className='form__container'>
          <Container maxWidth="sm" className={classes.border}>
            <form className={classes.loginForm} onSubmit={onLogin}>
              <p className={classes.header1}>Trainer Hub</p>
              {/* <h2 className={classes.header2}>Welcome to Client Manager</h2> */}
              <div>
                {errors.map((error) => (
                  <div>{error}</div>
                ))}
              </div>
              <div>
                {/* <label htmlFor="email"></label> */}
                <TextField
                  className={classes.inputs}
                  id="standard-basic"
                  label="Email"
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div>
                {/* <label htmlFor="password"></label> */}
                <TextField
                  className={classes.inputs2}
                  id="standard-basic"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={updatePassword}
                />
                {/* <button type="submit">Login</button> */}
                <Button variant="contained" color="secondary" type="submit" className={classes.loginBtn}>
                  Sign in
                </Button>
                <Button variant="contained" color="secondary" onClick={demoLogin} className={classes.demoBtn}>
                  Demo
                </Button>
              </div>
              <NavLink to="/sign-up" exact={true} activeClassName="active" className={classes.signUp}>
                Sign Up
          </NavLink>
            </form>

          </Container>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
