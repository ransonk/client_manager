export const SET_CURRENT_TRAINER = "SET_CURRENT_TRAINER";
export const SET_CURRENT_CLIENT = "SET_CURRENT_CLIENT";
export const SET_CURRENT_CLIENTS = "SET_CURRENT_CLIENTS";
export const SET_WORKOUTS = "SET_WORKOUTS";
export const ADD_WORKOUT = "ADD_WORKOUT";
export const SET_INTENSITIES = "SET_INTENSITIES";
export const ADD_INTENSITY = "ADD_INTENSITY";
export const SET_WORKOUT_PLANS = "SET_WORKOUT_PLANS";
export const ADD_WORKOUT_PLAN = "ADD_WORKOUT_PLAN";
export const SET_ROUTINE_LISTS = "SET_ROUTINE_LISTS";
export const ADD_ROUTINE_LIST = "ADD_ROUTINE_LIST";
export const SET_ROUTINES = "SET_ROUTINES";
export const ADD_ROUTINE = "ADD_ROUTINE";

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

export const setIntensities = (intensities) => {
    return {
        type: SET_INTENSITIES,
        intensities
    }
}

export const setWorkoutPlans = (workoutplans) => {
    return {
        type: SET_WORKOUT_PLANS,
        workoutplans
    }
}

export const setRoutineLists = (routinelists) => {
    return {
        type: SET_ROUTINE_LISTS,
        routinelists
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

export const fetchWorkoutPlans = async (clientId) => {
    const response = await fetch(`/api/trainers/client/${clientId}/workout-plans`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const workoutplans = {}
    // console.log('clients', result)
    result.workoutplans.forEach(workoutplan => {
        workoutplans[workoutplan.id] = workoutplan
    })
    return workoutplans
}

export const fetchRoutineList = async (workoutPlanId) => {
    const response = await fetch(`/api/trainers/workout-plans/${workoutPlanId}/routinelist`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const routinelists = {}
    // console.log('clients', result)
    result.routinelists.forEach(routinelist => {
        routinelists[routinelist.id] = routinelist
    })
    console.log('fetchRoutineList returns:', routinelists)
    return routinelists
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

export const fetchIntensities = async (trainerId) => {
    const response = await fetch(`/api/trainers/${trainerId}/intensities`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    console.log('workoutssss', result.workouts)
    const intensities = {}
    result.intensities.forEach(intensity => {
        intensities[intensity.id] = intensity
    })
    return intensities
}

const initialState = {
    current_trainer: {},
    current_client: {},
    clients: {},
    workouts: {},
    intensities: {},
    workoutplans: {},
    routinelists: {},
    routines: {},
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
        case SET_INTENSITIES: {
            newState.intensities = { ...action.intensities }
            return newState;
        }
        case SET_WORKOUT_PLANS: {
            newState.workoutplans = { ...action.workoutplans }
            return newState;
        }
        case SET_ROUTINE_LISTS: {
            newState.routinelists = { ...action.routinelists }
            return newState;
        }
        default:
            return state;
    }
}
