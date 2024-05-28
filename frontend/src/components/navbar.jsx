// navbar.jsx

import React from 'react'
import user_png from "../user.png";
import { FcTodoList } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { useEffect } from 'react';

const navbar = () => {

  const Navigate = useNavigate();

  const isloggedin = useSelector((state) => state.isloggedin);
  const dispatch = useDispatch();


  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
    Navigate("/signin");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container" >
          <Link className="navbar-brand text-white" to="/">
            Todo List
            <FcTodoList className='ms-2' />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            // data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bg-white" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link className="nav-link active " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/todo_list">
                  Todo List
                </Link>
              </li>
              {!isloggedin &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="SignUp">
                      SignUp
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="SignIn">
                      SignIn
                    </Link>
                  </li>
                </>
              }

              {isloggedin &&
                <li className="nav-item" onClick={logout}>
                  <Link className="nav-link active" aria-current="page" to="#">
                    Logout
                  </Link>
                </li>
              }

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  <img className='user_png' src={user_png} alt="user" />
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>

    </>
  )
}

export default navbar;
