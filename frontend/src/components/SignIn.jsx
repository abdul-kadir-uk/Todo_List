import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Robust email validation regex

const SignIn = () => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const [inputs, setinputs] = useState({
    email: "", password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setinputs({ ...inputs, [name]: value });
  }


  const submit = async (e) => {
    e.preventDefault();


    if (inputs.email === "") {
      toast.error("Email cannot be empty");
      return;
    } else if (inputs.password === "") {
      toast.error("Password cannot be empty");
      return;
    }
    else if (!EMAIL_REGEX.test(inputs.email)) {
      toast.error('Please enter a valid email address.');
      return; // Prevent form submission if email is invalid
    }
    else {
      try {
        await axios.post(`http://localhost:1000/api/v1/signin`, inputs)
          .then((response) => {
            sessionStorage.setItem("id", response.data.others._id);
            dispatch(authActions.login());
            Navigate("/todo_list");
          });
        setinputs({
          email: "", password: ""
        });
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          toast.error("Password is incorrect");
        } else if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred during signin");
        }
      }

    }
  }

  return (
    <div className="signin-top-box box-format">
      <ToastContainer />
      <div className='container SignUp d-flex flex-column justify-content-center mt-5'>
        <h1 className='text-center'> Sign In </h1>
        <label className='fs-3' htmlFor="email">
          Email
        </label>
        <input id='email' placeholder='Enter Your Email' type="text"
          name='email' value={inputs.email} onChange={change}
        />

        <label className='fs-3' htmlFor="pass"> Password </label>
        <input id='pass' placeholder='Enter Your Password' type="password"
          name='password' value={inputs.password} onChange={change}
        />

        <div className="signin-box-btn  mt-3 d-flex justify-content-center">

          <button className="btn btn-dark btn-signin" onClick={submit}>Sign In</button>

        </div>
      </div>
    </div>

  )
}

export default SignIn;
