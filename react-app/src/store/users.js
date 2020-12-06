export const SET_CURRENT_TRAINER = "SET_CURRENT_TRAINER";
export const SET_CURRENT_CLIENT = "SET_CURRENT_CLIENT"
export const SET_CURRENT_CLIENTS = "SET_CURRENT_CLIENTS"

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

export const fetchClients = async (trainerId) => {
    const response = await fetch(`/api/trainers/${trainerId}/clients`, {
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

export const setTrainerClients = (clients) => {
    return {
        type: SET_CURRENT_CLIENTS,
        clients
    }
}

const initialState = {
    current_trainer: {},
    current_client: {},
}

export default function reducer(state = initialState, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_CURRENT_TRAINER: {
            newState.current_trainer = { ...action.trainer }
            return newState;
        }
        // case SET_CURRENT_CLIENTS: {
        //     newState.clients = { ...action.clients }
        //     return newState;
        // }
        case SET_CURRENT_CLIENT: {
            state.current_client = { ...action.client }
            return state;
        }
        default:
            return state;
    }
}
