import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchClient } from '../../store/users';
import EditClientProfile from './EditClientProfile';
import { setCurrentClient } from '../../store/users';
import { fetchWorkoutPlans, setWorkoutPlans } from '../../store/users'

const ClientInfo = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [paid, setPaid] = useState();
    const [duedate, setDueDate] = useState();
    const [amount, setAmount] = useState();
    const [weight, setWeight] = useState();
    const [noshows, setNoShows] = useState();
    const [cancellations, setCancellations] = useState();
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
            setNoShows(secureClient.noshows)
            setCancellations(secureClient.cancellations)
            setFirstName(secureClient.firstName)
            setLastName(secureClient.lastName)
            const workoutplans = await fetchWorkoutPlans(id);
            dispatch(setWorkoutPlans(workoutplans))

        })();

    }, [phone, email, paid, duedate, amount, weight, age, firstName]);



    return (
        <div className='clientinfo__container'>
            <div className='clientinfo__info'>
                <h1 className='clientinfo__header'>{firstName + ' ' + lastName}</h1>
                <div className='clientinfo__clientcard'>
                    <div className='clientinfo__info__contact'>
                        <p className='card__header'>Contact</p>
                        <p className='card__contact'>Phone:</p>
                        {phone}
                        <br />
                        <br />
                        <p className='card__contact'>Email:</p>
                        {email}
                    </div>
                    <div className='clientinfo__info__contact'>
                        <p className='card__header'>Stats</p>
                        <p>Age:</p>
                        {age}
                        <br />
                        <br />
                        <p>Weight:</p>
                        {weight}
                    </div>
                    <div className='clientinfo__info__contact'>
                        <p className='card__header'>Attendance</p>
                        <p>No Shows:</p>
                        {noshows}
                        <p className='cancellation'>Cancellations:</p>
                        {cancellations}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientInfo;
