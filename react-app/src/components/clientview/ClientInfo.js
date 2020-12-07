import React, { useState, useEffect } from 'react';
import { fetchClient } from '../../store/users';
import EditClientProfile from './EditClientProfile';

const ClientInfo = () => {

    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [paid, setPaid] = useState();
    const [duedate, setDueDate] = useState();
    const [amount, setAmount] = useState();
    const [weight, setWeight] = useState();
    const [age, setAge] = useState();


    const client = JSON.parse(localStorage.getItem('CURRENT_CLIENT'))
    let id = client.id
    let secureClient;

    useEffect(() => {
        (async () => {

            secureClient = await fetchClient(id);
            setPhone(secureClient.phone)
            setEmail(secureClient.email)
            setPaid(secureClient.paid)
            setDueDate(secureClient.duedate)
            setAmount(secureClient.amount)
            setWeight(secureClient.weight)
            setAge(secureClient.age)
        })();
        // window.location.reload();
    }, []);



    return (
        <div className='clientinfo__container'>
            <div className='editclient__btn'><EditClientProfile /></div>
            <div className='clientinfo__info'>
                <h1 className='clientinfo__header'>{client.firstName + ' ' + client.lastName}</h1>
                <div className='clientinfo__clientcard'>

                    <div className='clientinfo__info__contact'>
                        <p className='card__header'>Contact</p>
                        <p>Phone: {phone}</p>
                        <p>Email: {email}</p>
                    </div>
                    <div className='clientinfo__info__contact'>
                        <p className='card__header'>Stats</p>
                        <p>Age: {age}</p>
                        <p>Weight: {weight}</p>
                    </div>
                </div>
            </div>
            <div className='clientinfo__payment'>
                <h1 className='clientinfo__header'>Payment</h1>
                <div className='clientinfo__paymentcard'>

                    <div className='clientinfo__info__payment'>
                        <p className='card__header'>Amount</p>
                        <p>${amount}</p>
                    </div>
                    <div className='clientinfo__info__payment'>
                        <p className='card__header'>Paid</p>
                        <p>
                            {paid === true ? 'Yes' : 'No'}
                        </p>
                    </div>
                    <div className='clientinfo__info__payment__duedate'>
                        <p className='card__header'>Next Due Date</p>
                        <p>{duedate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientInfo;
