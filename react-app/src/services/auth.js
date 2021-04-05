export const authenticate = async () => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  let res = await response.json();
  return res;
}

export const demoTrainerLogin = async (email, password) => {
  const response = await fetch('/api/auth/demo-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  });
  let res = await response.json();
  return res;
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUp = async (firstName, lastName, email, password) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,

    })
  })
  return await response.json();
}

export const createClient = async (firstName, lastName, email, phone, weight, age, duedate, amount, paid, password, trainer_id) => {
  const response = await fetch(`/api/trainers/${trainer_id}/create-client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
      trainer_id
    }),
  });
  return await response.json();
}

export const createWorkout = async (name, type, trainer_id) => {
  const response = await fetch(`/api/trainers/${trainer_id}/create-workout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name, type, trainer_id
    }),
  });
  return await response.json();
}

export const createHistory = async (name,
  workout1,
  workout1Score,
  workout2,
  workout2Score,
  workout3,
  workout3Score,
  workout4,
  workout4Score,
  workout5,
  workout5Score,
  workout6,
  workout6Score,
  workout7,
  workout7Score,
  workout8,
  workout8Score,
  date,
  client_id,
  trainer_id) => {
  const response = await fetch(`/api/trainers/client/${client_id}/create-workout-history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      workout1,
      workout1Score,
      workout2,
      workout2Score,
      workout3,
      workout3Score,
      workout4,
      workout4Score,
      workout5,
      workout5Score,
      workout6,
      workout6Score,
      workout7,
      workout7Score,
      workout8,
      workout8Score,
      date,
      client_id,
      trainer_id
    }),
  });
  return await response.json();
}

export const createWorkoutPlan = async (
  name,
  workout1,
  set1,
  weight1,
  workout2,
  set2,
  weight2,
  workout3,
  set3,
  weight3,
  workout4,
  set4,
  weight4,
  workout5,
  set5,
  weight5,
  workout6,
  set6,
  weight6,
  workout7,
  set7,
  weight7,
  workout8,
  set8,
  weight8, time, date, clientFirstName, clientLastName, client_id, trainer_id) => {
  const response = await fetch(`/api/trainers/client/${client_id}/create-workout-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      workout1,
      set1,
      weight1,
      workout2,
      set2,
      weight2,
      workout3,
      set3,
      weight3,
      workout4,
      set4,
      weight4,
      workout5,
      set5,
      weight5,
      workout6,
      set6,
      weight6,
      workout7,
      set7,
      weight7,
      workout8,
      set8,
      weight8, time, date, clientFirstName, clientLastName, client_id, trainer_id
    }),
  });
  return await response.json();
}

export const deleteWorkout = async (workoutId) => {
  const response = await fetch(`/api/trainers/delete-workout/${workoutId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      workoutId
    }),
  });
  const resJSON = await response.json();
  if (resJSON.message === "delete successful") {
    window.location.href = '/';
  }
}

export const deleteWorkoutPlan = async (workoutPlanId) => {
  const response = await fetch(`/api/trainers/delete-workoutPlan/${workoutPlanId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      workoutPlanId
    }),
  });
  const resJSON = await response.json();
  if (resJSON.message === "delete successful") {
    window.location.reload();
  }
}

export const createIntensity = async (sets, reps, trainer_id) => {
  const response = await fetch(`/api/trainers/${trainer_id}/create-intensity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sets, reps, trainer_id
    }),
  });
  return await response.json();
}

export const deleteIntensity = async (intensityId) => {
  const response = await fetch(`/api/trainers/delete-intensity/${intensityId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intensityId
    }),
  });
  const resJSON = await response.json();
  if (resJSON.message === "delete successful") {
    window.location.href = '/';
  }
}
