import React from 'react';

function ClientInfo(props) {

    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))
    // if (!client) return null;
    console.log(client)

    return (
        <div className='clientinfo__container'>
            <div className='clientinfo__info'>
                <h1 className='clientinfo__header'>{client.firstName + ' ' + client.lastName}</h1>
                <div className='clientinfo__clientcard'>

                    <div className='clientinfo__info__contact'>
                        Contact
    <p>Phone: {client.firstName}</p>
                    </div>
                    <div>
                        Stats
                </div>
                </div>
            </div>
            <div className='clientinfo__payment'>
                <h1>Payment</h1>
            </div>
        </div>
    );
}

export default ClientInfo;
