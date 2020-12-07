import React from 'react';
import ButtonAppBar from '../AppBar';
import Title from './Title';
import ClientInfo from './ClientInfo';
import Footer from '../Footer';

const ClientView = ({ setAuthenticated }) => {
    return (
        <>
            <ButtonAppBar setAuthenticated={setAuthenticated} />
            <div className='client-view__container'>
                <Title />
                <ClientInfo />
            </div>
            <Footer />
        </>
    );
}

export default ClientView;
