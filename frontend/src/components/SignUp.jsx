import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Robust email validation regex

const SignUp = () => {

  const Navigate = useNavigate();

  const [inputs, setinputs] = useState({
    email: "", username: "", password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setinputs({ ...inputs, [name]: value });
  }


  const submit = async (e) => {
    e.preventDefault();

    // Client-side email validation

    if (inputs.email === "" && inputs.username === "" && inputs.password === "") {
      toast.error("All field is required");
      return;
    }
    else if (inputs.email == "") {
      toast.error("Email cannot be empty");
      return;
    } else if (inputs.username == "") {
      toast.error("Usename cannot be empty");
      return;
    } else if (inputs.password == "") {
      toast.error("Password cannot be Empty");
      return;
    } else if (inputs.password.length < 8) {
      toast.error("password must be 8 digits")
    }
    else if (!EMAIL_REGEX.test(inputs.email)) {
      toast.error('Please enter a valid email address.');
      return; // Prevent form submission if email is invalid
    }

    try {
      const response = await axios.post(`http://localhost:1000/api/v1/signup`, inputs);

      if (response.status === 201) {
        alert(response.data.message);
        setinputs({
          email: "", username: "", password: ""
        })
        Navigate("/signin");
      }

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
      else {
        toast.error("An error occured during signup");
      }
    }

  }


  return (
    <>
      <div className="signup-top-box box-format">
        <ToastContainer />
        <div className='container SignUp flex-column d-flex justify-content-center align-item-center mt-5'>
          <h1 className='text-center'> SignUp </h1>
          <label htmlFor="email">
            Email
          </label>
          <input id='email' placeholder='Enter Your Email' type="email" name='email'
            onChange={change} value={inputs.email}
          />

          <label htmlFor="uname"> UserName </label>
          <input id='uname' placeholder='Enter Your UserName' type="username" name='username'
            onChange={change} value={inputs.username}
          />

          <label htmlFor="pass"> Password </label>
          <input id='pass' placeholder='Enter Your Password' type="password" name='password'
            onChange={change} value={inputs.password} minLength={8}
          />

          <div className="signup-box-btn d-flex justify-content-center align-item-center mt-3">
            <button className="btn btn-dark btn-signup "
              onClick={submit}
            >Sign Up</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;
