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
  console.log(res)
  // console.log(await response.json())
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

export const createWorkoutPlan = async (
  name,
  workout1,
  set1,
  workout2,
  set2,
  workout3,
  set3,
  workout4,
  set4,
  workout5,
  set5,
  workout6,
  set6,
  workout7,
  set7,
  workout8,
  set8, time, date, client_id) => {
  const response = await fetch(`/api/trainers/client/${client_id}/create-workout-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      workout1,
      set1,
      workout2,
      set2,
      workout3,
      set3,
      workout4,
      set4,
      workout5,
      set5,
      workout6,
      set6,
      workout7,
      set7,
      workout8,
      set8, time, date, client_id
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
