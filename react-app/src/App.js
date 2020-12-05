import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import CreateClientForm from "./components/auth/CreateClientForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import HomePage from './components/HomePage';
import { authenticate } from "./services/auth";
import { setCurrentUser, setCurrentClient, fetchClients, setTrainerClients } from "./store/users";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // const currentClient = useSelector((state) => state.store.current_client);
  // const currentClients = useSelector((state) => state.store.clients);
  // const id = useSelector((state) => state.store.current_trainer.id);

  const interval = (id) => {
    setInterval(async function () {
      const clients = await fetchClients(id);
      dispatch(setTrainerClients(clients));
    }, 10000);
  }


  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
      dispatch(setCurrentUser(user))
      // interval(user.id)
      const clients = await fetchClients(user.id);
      dispatch(setTrainerClients(clients))
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <ProtectedRoute path="/create-client" exact={true} authenticated={authenticated}>
        <CreateClientForm />
      </ProtectedRoute>
      {/* <Route path="/create-client" exact={true} authenticated={authenticated}>
        <CreateClientForm />
      </Route> */}
      <ProtectedRoute path="/home" exact={true} authenticated={authenticated}>
        <UsersList />
      </ProtectedRoute>
      <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
        <User />
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        {/* <h1>My Home Page</h1> */}
        <HomePage setAuthenticated={setAuthenticated} />
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
