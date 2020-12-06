import React from 'react';
import ButtonAppBar from '../AppBar';
import Title from './Title';

const ClientView = ({ setAuthenticated }) => {
    return (
        <div>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <Title />
        </div>
    );
}

export default ClientView;
