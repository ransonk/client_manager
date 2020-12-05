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
