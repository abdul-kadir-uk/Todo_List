// Todo.jsx

import axios from 'axios';
import React, { useState } from 'react';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux'
// import { authActions } from '../store'
import { useEffect } from 'react';


const Todo = () => {
  let id = sessionStorage.getItem("id");

  const [updateArray, setupdateArray] = useState([]);


  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [Arrays, setArrays] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v2/GetTasks/${id}`);
        if (response.data.List) {
          setArrays(response.data.List);
        } else {
          // toast.info(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks");
      }
    };

    if (id) {
      fetchTasks();
      // Set up polling to fetch todos every 1 seconds
      const interval = setInterval(fetchTasks, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, []);

  const show_body = () => {
    document.getElementById("description").style.display = "block";
    document.getElementById("tbody").style.display = "block";
  }

  const show_add_btn = () => {
    document.getElementById("btn-add").style.display = "block";
  }

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }

  const submit = async () => {
    if (inputs.title == "" && inputs.body == "") {
      toast.error("Title and Body cannot be empty");
    }
    else if (inputs.title == "") {
      toast.error("Title cannot be empty");
      return;
    } else if (inputs.body == "") {
      toast.error("Body cannot be empty");
    }
    else {
      if (id) {
        try {
          const response = await axios.post(`http://localhost:1000/api/v2/AddTask`, {
            title: inputs.title,
            body: inputs.body,
            id: id
          });
          setArrays([response.data.list, ...Arrays]);
          setInputs({ title: "", body: "" });
          toast.success('Todo Added successfully');
        } catch (error) {
          console.error("Error adding task:", error);
          toast.error("Failed to add task");
        }
      } else {
        setArrays([inputs, ...Arrays]);
        setInputs({ title: "", body: "" });
        toast.error("SignIn To Save Task");
      }
    }
  }


  const del = async (cardid) => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/v2/DeleteTask/${cardid}`, { data: { userId: id } });
      if (response.status === 200) {
        setArrays(Arrays.filter(item => item._id !== cardid));
        toast.success("Task Deleted Successfully");
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  }

  const update = (value) => {
    const newitems = Arrays[value];
    setupdateArray(newitems);
  }
  // console.log(`${updateArray.title},${updateArray.body}`);

  const show_update = (value) => {
    document.getElementById("parent-update").style.display = value;
  }

  return (
    <>
      <div className="todo todo-content box-format todo-main-box content-container">
        <ToastContainer />
        <div className=" d-flex justify-content-center ">
          <div className="todo-list container flex-column d-flex justify-content-center align-item-center mt-5">
            <h1 className='text-center'>Todo List</h1>
            <label htmlFor="title" className='fs-3'>Title</label>
            <input onFocus={show_body} id='title' placeholder='Enter Title' type="text" name='title'
              onChange={change} value={inputs.title}
            />
            <label id='tbody' htmlFor="description" className='fs-3' style={{ display: 'none' }}>Body</label>
            <textarea onFocus={show_add_btn} placeholder='Enter Description...' cols={20} rows={4} name="body"
              onChange={change}
              id="description" value={inputs.body}
            ></textarea>
            <div className="t-add-btn d-flex justify-content-center align-item-center mt-3 ">
              <button id='btn-add' onClick={submit} className="btn btn-dark add-btn" >Add</button>
            </div>
          </div>

        </div>
        <div className="todo-body">

          <div className="container">

            {Arrays && Arrays.map((item, index) => (
              <div className="cards d-flex justify-content-center " key={index}>

                <TodoCards title={item.title} body={item.body}
                  id={item._id} delid={del}
                  display={show_update}
                  update_id={index}
                  tobe_update={update}
                />

              </div>
            ))}

          </div>
        </div>
        <div className="container " id='parent-update'>
          <Update display={show_update} update={updateArray}
            toast={toast}
          />

        </div>

      </div>
    </>
  );
}

export default Todo;