import React from 'react';
import { useDispatch, useSelector } from "react-redux";

function Title(props) {
    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))
    // if (!client) return null;
    // console.log(client)

    return (
        <div className='title__container'>
            <h1 className='title__header'>Client Planner</h1>
        </div>
    );
}

export default Title;
