import React from 'react';
import { useDispatch, useSelector } from "react-redux";

function Title(props) {
    const client = useSelector((state) => state.store.current_client)
    if (!client) return null;
    console.log(client)

    return (
        <div className='title__container'>
            <div className='title__header'>Current Client:</div>
            <div className='title__client-name'>
                {client.firstName + ' ' + client.lastName}
            </div>
        </div>
    );
}

export default Title;
