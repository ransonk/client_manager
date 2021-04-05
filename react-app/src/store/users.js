export const SET_CURRENT_TRAINER = "SET_CURRENT_TRAINER";
export const SET_CURRENT_CLIENT = "SET_CURRENT_CLIENT";
export const SET_CURRENT_CLIENTS = "SET_CURRENT_CLIENTS";
export const SET_WORKOUTS = "SET_WORKOUTS";
export const ADD_WORKOUT = "ADD_WORKOUT";
export const SET_INTENSITIES = "SET_INTENSITIES";
export const ADD_INTENSITY = "ADD_INTENSITY";
export const SET_WORKOUT_PLANS = "SET_WORKOUT_PLANS";
export const SET_TODAYS_PLANS = "SET_TODAYS_PLANS";
export const ADD_WORKOUT_PLAN = "ADD_WORKOUT_PLAN";
export const SET_ROUTINE_LISTS = "SET_ROUTINE_LISTS";
export const ADD_ROUTINE_LIST = "ADD_ROUTINE_LIST";
export const SET_ROUTINES = "SET_ROUTINES";
export const ADD_ROUTINE = "ADD_ROUTINE";
export const USER_LOGOUT = "USER_LOGOUT";
export const UPDATE_PROGRESS = "UPDATE_PROGRESS";
export const SET_ALL_WORKOUT_PLANS = "SET_ALL_WORKOUT_PLANS";
export const UPDATE_EXERCISE_HISTORY = "UPDATE_EXERCISE_HISTORY";

export const setCurrentUser = (trainer) => {
    return { type: SET_CURRENT_TRAINER, trainer };
};

export const setCurrentClient = (client) => {
    return {
        type: SET_CURRENT_CLIENT,
        client,
    };
};

export const updateProgress = (progress) => {
    return {
        type: UPDATE_PROGRESS,
        progress,
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

export const updateExerciseHistory = (exercises) => {
    return {
        type: UPDATE_EXERCISE_HISTORY,
        exercises
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

export const setAllWorkoutPlans = (workoutplans) => {
    return {
        type: SET_ALL_WORKOUT_PLANS,
        workoutplans
    }
}

export const setTodaysPlans = (workoutplans) => {
    return {
        type: SET_TODAYS_PLANS,
        workoutplans
    }
}

export const setRoutineLists = (routinelists) => {
    return {
        type: SET_ROUTINE_LISTS,
        routinelists
    }
}

export const setUserLogout = () => {
    return {
        type: USER_LOGOUT
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
    result.workoutplans.forEach(workoutplan => {
        workoutplans[workoutplan.id] = workoutplan
    })
    return workoutplans
}

export const fetchTargetWorkoutPlan = async (workoutPlanId) => {
    const response = await fetch(`/api/trainers/workout-plan/${workoutPlanId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const workoutPlan = {...result}
    return workoutPlan
}

export const fetchAllWorkoutPlans = async (trainerId) => {
    const response = await fetch(`/api/trainers/${trainerId}/workout-plans`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const allworkoutplans = {}
    result.allworkoutplans.forEach(workoutplan => {
        allworkoutplans[workoutplan.id] = workoutplan
    })
    return allworkoutplans
}

export const fetchWorkoutHistory = async (clientId) => {
    const response = await fetch(`/api/trainers/client/${clientId}/workout-history`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const workouthistory = {}
    result.workouthistory.forEach(history => {
        workouthistory[history.id] = history
    })
    return workouthistory
}

export const fetchTrainerWorkoutHistory = async (trainerId) => {
    const response = await fetch(`/api/trainers/${trainerId}/workout-history`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const workouthistory = {}
    result.workouthistory.forEach(history => {
        workouthistory[history.id] = history
    })
    return workouthistory
}

export const fetchTodaysPlans = async (trainer_id) => {
    const response = await fetch(`/api/trainers/${trainer_id}/todays-clients`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    const result = await response.json();
    const todayPlans = {}
    result.workoutplans.forEach(plan => {
        todayPlans[plan.id] = plan
    })
    return todayPlans
}

export const fetchRoutineList = async (workoutPlanId) => {
    const response = await fetch(`/api/trainers/workout-plans/${workoutPlanId}/routinelist`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    const routinelists = {}
    result.routinelists.forEach(routinelist => {
        routinelists[routinelist.id] = routinelist
    })
    return routinelists
}

export const fetchWorkouts = async (trainerId) => {
    const response = await fetch(`/api/trainers/${trainerId}/workouts`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
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
    const intensities = {}
    result.intensities.forEach(intensity => {
        intensities[intensity.id] = intensity
    })
    return intensities
}

const initialState = {
    current_trainer: {},
    current_client: {},
    client_progress: {},
    clients: {},
    workouts: {},
    intensities: {},
    workoutPlans: {},
    allWorkoutPlans: {},
    todaysPlans: {},
    exerciseHistory: {},
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
            newState.workoutPlans = { ...action.workoutplans }
            return newState;
        }
        case SET_ALL_WORKOUT_PLANS: {
            newState.allWorkoutPlans = { ...action.workoutplans }
            return newState;
        }
        case SET_TODAYS_PLANS: {
            newState.todaysPlans = { ...action.workoutplans }
            return newState;
        }
        case UPDATE_PROGRESS: {
            newState.client_progress = { ...action.progress }
            return newState;
        }
        case UPDATE_EXERCISE_HISTORY: {
            newState.exerciseHistory = { ...action.exercises }
            return newState;
        }
        case USER_LOGOUT: {
            return initialState;
        }
        default:
            return state;
    }
}
