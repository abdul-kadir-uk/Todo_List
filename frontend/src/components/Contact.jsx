import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Contact = () => {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [inputs, setinputs] = useState({
    Name: "",
    Email: "",
    Query: ""
  })

  const change = (e) => {
    const { name, value } = e.target;
    setinputs({ ...inputs, [name]: value });
  }

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (inputs.Name === "" || inputs.Email === "" || inputs.Query === "") {
      toast.error("all field is required");
    }
    else if (!EMAIL_REGEX.test(inputs.Email)) {
      toast.error("Please Enter Valid Email");
      return;
    }
    else {

      try {
        await axios.post(`http://localhost:1000/api/v3/submitquery`, inputs).then((response) => {
          console.log(response);
          toast.success("Query Submitted");
          setinputs({ Name: "", Email: "", Query: "" });
        })
      } catch (error) {
        console.error(error);
        toast.error("Query not Submitted");

      }
    }
  }

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-item-center mt-5">
        <ToastContainer />
        <div className="contact-box d-flex justify-content-center align-item-center flex-column mt-4
        ">
          <h1 className='text-center'>Contact</h1>
          <label htmlFor="c-name" className='fs-4'> Name </label>
          <input id='c-name' type="text" name='Name' value={inputs.Name} onChange={change}

          />

          <label htmlFor="c-email" className='fs-4'> Email </label>
          <input id='c-email' type="text" name='Email' value={inputs.Email} onChange={change} />

          <label htmlFor="c-query" className='fs-4'
          > Query </label>
          <textarea cols="30" rows="5" id="c-query"
            name='Query' value={inputs.Query} onChange={change}
          />

          <div className="btncontact d-flex justify-content-center mt-4 ">
            <button className='btn btn-dark contact-sumbmit-btn'
              onClick={handlesubmit}
            >Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact;
