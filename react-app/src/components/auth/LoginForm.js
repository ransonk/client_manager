import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import theme from '../../theme';
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
    width: "50%"
  },
  inputs2: {
    alignContent: "center",
    width: "50%",
    marginBottom: "0.5rem"
  },
  loginBtn: {
    position: "relative",
    top: "6rem",
    right: "13rem",
    width: "10rem"
    // alignContent: "center"
    // textAlign: "center"
  },
  header1: {
    color: theme.palette.primary.main,
    fontFamily: 'Pacifico, cursive',
    fontSize: "3rem",
    position: "relative",
    // right: "4rem",
    bottom: "2rem"
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
    bottom: "10rem"
  },
  signUp: {
    position: "relative",
    left: "14rem",
  }
}));

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const classes = useStyles();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

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
    <div className='login-page__container'>
      <div className='login__graphic'>
        <img src={Logo} width='100%'></img>
      </div>
      <div className='login__container'>
        <Container maxWidth="sm" className={classes.border}>
          <form className={classes.loginForm} onSubmit={onLogin}>
            <p className={classes.header1}>Client Manager</p>
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
            </div>
            <NavLink to="/sign-up" exact={true} activeClassName="active" className={classes.signUp}>
              Sign Up
          </NavLink>
          </form>

        </Container>
      </div>
    </div>
  );
};

export default LoginForm;
