import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp, createClient } from '../../services/auth';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

const CreateClientForm = ({ authenticated, setAuthenticated, props }) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [duedate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const currentTrainerId = useSelector((state) => state.store.current_trainer.id)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await createClient(firstName, lastName, email, phone, weight, age, duedate, amount, paid, password, currentTrainerId);
      if (!user.errors) {
        // setAuthenticated(true);
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
    setPaid(!paid)
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
          type="integer"
          name="phone"
          onChange={updatePhone}
          value={phone}
        ></input>
      </div>
      <div>
        <label>Weight</label>
        <input
          type="text"
          name="weight"
          onChange={updateWeight}
          value={weight}
        ></input>
      </div>
      <div>
        <label>Age</label>
        <input
          type="text"
          name="age"
          onChange={updateAge}
          value={age}
        ></input>
      </div>
      <div>
        <label>DueDate</label>
        <input
          type="string"
          name="duedate"
          onChange={updateDueDate}
          value={duedate}
        ></input>
      </div>
      <div>
        <label>Amount</label>
        <input
          type="text"
          name="amount"
          onChange={updateAmount}
          value={amount}
        ></input>
      </div>
      <div>
        <label>Paid</label>
        <Checkbox
          // checked='false'
          className={classes.root}
          // checked='false'
          disableRipple
          color="default"
          checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
          icon={<span className={classes.icon} />}
          inputProps={{ 'aria-label': 'decorative checkbox' }}
          {...props}
          onChange={updatePaid}
        />
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

// import React, { useState } from "react";
// import { Redirect } from 'react-router-dom';
// import { signUp, createClient } from '../../services/auth';

// const CreateClientForm = ({ authenticated, setAuthenticated }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [weight, setWeight] = useState("");
//   const [age, setAge] = useState("");
//   const [duedate, setDueDate] = useState("");
//   const [amount, setAmount] = useState("");
//   const [paid, setPaid] = useState("False");
//   const [password, setPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");

//   const onSignUp = async (e) => {
//     e.preventDefault();
//     if (password === repeatPassword) {
//       const user = await createClient(firstName, lastName, email, phone, weight, age, duedate, amount, paid, password);
//       if (!user.errors) {
//         // setAuthenticated(true);
//       }
//     }
//   };

//   const updateFirstName = (e) => {
//     setFirstName(e.target.value);
//   };

//   const updateLastName = (e) => {
//     setLastName(e.target.value);
//   };

//   const updateEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const updatePhone = (e) => {
//     setPhone(e.target.value);
//   };

//   const updateWeight = (e) => {
//     setWeight(e.target.value);
//   };

//   const updateAge = (e) => {
//     setAge(e.target.value);
//   };

//   const updateDueDate = (e) => {
//     setDueDate(e.target.value);
//   };

//   const updateAmount = (e) => {
//     setAmount(e.target.value);
//   };

//   const updatePaid = (e) => {
//     setPaid(e.target.value);
//   };

//   const updatePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const updateRepeatPassword = (e) => {
//     setRepeatPassword(e.target.value);
//   };

//   if (authenticated) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <form onSubmit={onSignUp}>
//       <div>
//         <label>First Name</label>
//         <input
//           type="text"
//           name="firstName"
//           onChange={updateFirstName}
//           value={firstName}
//         ></input>
//       </div>
//       <div>
//         <label>Last Name</label>
//         <input
//           type="text"
//           name="lastName"
//           onChange={updateLastName}
//           value={lastName}
//         ></input>
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type="text"
//           name="email"
//           onChange={updateEmail}
//           value={email}
//         ></input>
//       </div>
//       <div>
//         <label>Phone</label>
//         <input
//           type="integer"
//           name="phone"
//           onChange={updatePhone}
//           value={phone}
//         ></input>
//       </div>
//       <div>
//         <label>Weight</label>
//         <input
//           type="text"
//           name="weight"
//           onChange={updateWeight}
//           value={weight}
//         ></input>
//       </div>
//       <div>
//         <label>Age</label>
//         <input
//           type="text"
//           name="age"
//           onChange={updateAge}
//           value={age}
//         ></input>
//       </div>
//       <div>
//         <label>DueDate</label>
//         <input
//           type="string"
//           name="duedate"
//           onChange={updateDueDate}
//           value={duedate}
//         ></input>
//       </div>
//       <div>
//         <label>Amount</label>
//         <input
//           type="text"
//           name="amount"
//           onChange={updateAmount}
//           value={amount}
//         ></input>
//       </div>
//       <div>
//         <label>Paid</label>
//         <input
//           type="boolean"
//           name="paid"
//           onChange={updatePaid}
//           value={paid}
//         ></input>
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={updatePassword}
//           value={password}
//         ></input>
//       </div>
//       <div>
//         <label>Repeat Password</label>
//         <input
//           type="password"
//           name="repeat_password"
//           onChange={updateRepeatPassword}
//           value={repeatPassword}
//           required={true}
//         ></input>
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default CreateClientForm;
