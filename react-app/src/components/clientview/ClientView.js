import React from 'react';
import ButtonAppBar from '../AppBar';

const ClientView = ({ setAuthenticated }) => {
    return (
        <div>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
        </div>
    );
}

export default ClientView;
