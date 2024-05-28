import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home container">
          <h1> Welcome to our Todo List </h1>

          <p>
            Make life easy by taking care of your all problems ,
            track your progress.
          </p>
          <button className='addtodobtn bg-dark text-white' >
            <Link to="/todo_list"> Add Todo </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home;
