import React from 'react';

function Title(props) {
    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))

    return (
        <div className='title__container'>
            <h1 className='title__header'>Client Planner</h1>
        </div>
    );
}

export default Title;
