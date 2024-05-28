import './App.css';
import React, { useEffect } from 'react';
import Navbar from './components/navbar';
import Home from './components/Home';
import About from './components/About';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Footer from './components/footer';
import Contact from './components/Contact';
import Todo from './components/Todo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from './store';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="main-body">
          <Router>
            <Navbar />

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/todo_list" element={<Todo />} />

            </Routes>

          </Router>
        </div>

        <div className="footer-body">
          <Footer />
        </div>

      </div>
    </>
  )

}

export default App;