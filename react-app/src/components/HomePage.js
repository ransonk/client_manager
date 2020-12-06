import React from 'react';
import ButtonAppBar from './AppBar';

const HomePage = ({ setAuthenticated }) => {
    return (
        <div>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
        </div>
    );
}

export default HomePage;
