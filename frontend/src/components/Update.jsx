// Update.jsx

import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';


const Update = ({ display, update, toast }) => {


  // console.log(`${update.title},${update.body}`);
  const [inputs, setinputs] = useState({ title: "", body: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setinputs({ ...inputs, [name]: value });
  }

  // console.log(update);
  // console.log(inputs);


  const submit = async () => {

    await axios.put(`http://localhost:1000/api/v2/UpdateTask/${update._id}`, inputs)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
      })

    display("none");
  }

  useEffect(() => {
    setinputs({
      title: update.title,
      body: update.body
    })
  }, [update]);


  return (
    <>
      <div className="update-box ">
        <div className='container p-5 d-flex justify-content-center align-items-center flex-column'>
          <h1>Update Your Todo List</h1>
          <label htmlFor="u-title" className='py-2 fs-3'>Title</label>
          <input
            type="text"
            className='update-title form-control'
            id='u-title'
            style={{ width: '29rem', fontWeight: 'bolder' }}
            name='title'
            value={inputs.title}
            onChange={change}
          />
          <label htmlFor="u-body" className='py-2 fs-3'>Description</label>
          <textarea
            id="u-body"
            cols={60}
            rows={2}
            className='form-control'
            style={{ width: '29rem' }}
            name='body'
            value={inputs.body}
            onChange={change}
          />
          <div className="btn-modified d-flex mt-1">
            <button className='u-btn btn btn-dark mt-1 mx-2' onClick={submit}> Update </button>
            <button className='u-btn btn btn-dark mt-1 mx-2 '
              onClick={() => {
                display('none');
              }}> Close </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;