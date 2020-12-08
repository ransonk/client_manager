export const SET_CURRENT_TRAINER = "SET_CURRENT_TRAINER";
export const SET_CURRENT_CLIENT = "SET_CURRENT_CLIENT";
export const SET_CURRENT_CLIENTS = "SET_CURRENT_CLIENTS";
export const SET_WORKOUTS = "SET_WORKOUTS";
export const ADD_WORKOUT = "ADD_WORKOUT";

export const setCurrentUser = (trainer) => {
    return { type: SET_CURRENT_TRAINER, trainer };
};

export const setCurrentClient = (client) => {
    // console.log(classroom)
    return {
        type: SET_CURRENT_CLIENT,
        client,
    };
};

export const setTrainerClients = (clients) => {
    return {
        type: SET_CURRENT_CLIENTS,
        clients
    }
}

export const setWorkouts = (workouts) => {
    return {
        type: SET_WORKOUTS,
        workouts
    }
}

export const fetchClients = async (trainerId) => {
    const response = await fetch(`/api/trainers/${trainerId}/s-clients`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const clients = {}
    console.log('clients', result)
    result.clients.forEach(client => {
        clients[client.id] = client
    })
    return clients
}

export const fetchClient = async (clientId) => {
    const response = await fetch(`/api/trainers/client/${clientId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const client = { ...result }
    return client
}

export const fetchWorkouts = async (trainerId) => {
    const response = await fetch(`/api/trainers/${trainerId}/workouts`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    console.log('workoutssss', result.workouts)
    const workoutss = {}
    result.workouts.forEach(workout => {
        workoutss[workout.id] = workout
    })
    return workoutss
}

const initialState = {
    current_trainer: {},
    current_client: {},
    clients: {},
    workouts: {},
}

export default function reducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_CURRENT_TRAINER: {
            newState.current_trainer = { ...action.trainer }
            return newState;
        }
        case SET_CURRENT_CLIENTS: {
            newState.clients = { ...action.clients }
            return newState;
        }
        case SET_CURRENT_CLIENT: {
            newState.current_client = { ...action.client }
            return newState;
        }
        case SET_WORKOUTS: {
            newState.workouts = { ...action.workouts }
            return newState;
        }
        default:
            return state;
    }
}
