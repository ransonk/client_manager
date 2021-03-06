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
import ClientView from './components/clientview/ClientView';
import { authenticate } from "./services/auth";
import { setCurrentUser, setCurrentClient, fetchClients, setWorkoutPlans, updateProgress, fetchTodaysPlans, setTodaysPlans, setTrainerClients, fetchWorkouts, setWorkouts, fetchIntensities, setIntensities, fetchWorkoutPlans, setAllWorkoutPlans, fetchAllWorkoutPlans } from "./store/users";

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const id = useSelector((state) => state.store.current_trainer.id);

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

      const workouts = await fetchWorkouts(user.id);
      dispatch(setWorkouts(workouts))

      const workoutPlans = await fetchWorkoutPlans(user.id)
      dispatch(setWorkoutPlans(workoutPlans))

      const allWorkoutPlans = await fetchAllWorkoutPlans(user.id)
      dispatch(setAllWorkoutPlans(allWorkoutPlans))

      const intensities = await fetchIntensities(user.id);
      dispatch(setIntensities(intensities))

      const todaysPlans = await fetchTodaysPlans(user.id)
      dispatch(setTodaysPlans(todaysPlans))


    })();
  }, [authenticated]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
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
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <HomePage setAuthenticated={setAuthenticated} />
      </ProtectedRoute>
      <ProtectedRoute path="/manage-client" exact={true} authenticated={authenticated}>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
