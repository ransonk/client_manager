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
            // dispatch(setCurrentClient(secureClient))
            const workoutplans = await fetchWorkoutPlans(id);
            dispatch(setWorkoutPlans(workoutplans))

        })();

    }, [phone, email, paid, duedate, amount, weight, age, firstName]);



    return (
        <div className='clientinfo__container'>
            <div className='clientinfo__container'>
                <div className='clientinfo__payment'>
                    <h1 className='clientinfo__header'>Payment</h1>
                    <div className='clientinfo__paymentcard'>

                        <div className='clientinfo__info__payment'>
                            <p className='card__header'>Due</p>
                            <p>{'$' + amount}</p>
                        </div>
                        <div className='clientinfo__info__payment'>
                            <p className='card__header'>Paid</p>
                            <p>
                                {paid === true ? 'Yes' : 'No'}
                            </p>
                        </div>
                        <div className='clientinfo__info__payment__duedate'>
                            <p className='card__header'>Next Due</p>
                            <p className='duedate'>{duedate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientInfo;
