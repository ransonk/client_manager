import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';

const CreateClientForm = ({ authenticated, setAuthenticated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(firstName, lastName, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePhone = (e) => {
    setPhone(e.target.value);
  };

  const updateWeight = (e) => {
    setWeight(e.target.value);
  };

  const updateAge = (e) => {
    setAge(e.target.value);
  };

  const updateDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const updateAmount = (e) => {
    setAmount(e.target.value);
  };

  const updatePaid = (e) => {
    setPaid(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={updateLastName}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Phone</label>
        <input
          type="text"
          name="email"
          onChange={updatePhone}
          value={phone}
        ></input>
      </div>
      <div>
        <label>Weight</label>
        <input
          type="text"
          name="email"
          onChange={updateWeight}
          value={weight}
        ></input>
      </div>
      <div>
        <label>Age</label>
        <input
          type="text"
          name="email"
          onChange={updateAge}
          value={age}
        ></input>
      </div>
      <div>
        <label>DueDate</label>
        <input
          type="text"
          name="email"
          onChange={updateDueDate}
          value={dueDate}
        ></input>
      </div>
      <div>
        <label>Amount</label>
        <input
          type="text"
          name="email"
          onChange={updateAmount}
          value={amount}
        ></input>
      </div>
      <div>
        <label>Paid</label>
        <input
          type="text"
          name="email"
          onChange={updatePaid}
          value={paid}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default CreateClientForm;
