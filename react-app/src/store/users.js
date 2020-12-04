export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CURRENT_CLIENT = "SET_CURRENT_CLIENT"
export const SET_CURRENT_CLIENTS = "SET_CURRENT_CLIENTS"

export const setCurrentUser = (user) => {
    return { type: SET_CURRENT_USER, user };
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

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return {
                ...state,
                current_user: action.user,
            };
        }
        case SET_CURRENT_CLIENTS: {
            return {
                ...state,
                clients: action.clients,
            }
        }
        default:
            return state;
    }
}
