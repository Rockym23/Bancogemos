import React from 'react'
import './App.css';
import Navbarra from './navBar/Navbar';
import Home from './home/home';
import All from './All/All';
import Withdraw from './Withdraw/Withdraw';
import Deposit from './Deposit/Deposit';
import Createacc from './createAccount/CreateAccount';
import Signup from './signup/Signup';
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes , Link } from 'react-router-dom';
import Signin from './signin/Signin';
import NotSignIn from './error/NotSignIn';
import AuthProvider  from './context/AuthContext'
import { useAuth } from './context/AuthContext';




function App() {


  return (
    
    <Router>
    <div>
    <AuthProvider>
    <div>
       <Navbarra/>
      </div>
    <hr className='hrself' />
    <div></div>
    
      <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create"  element={<Createacc />} />
          <Route path="/deposit"  element={<Deposit />} />
          <Route path="/withdraw"  element={<Withdraw />} />
          <Route path="/all"  element={<All />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/signin" element={<Signin />}/>
          <Route path="/notsignin" element={<NotSignIn />}/>
      </Routes>
    </AuthProvider>
    </div>
    </Router>
  );
}

export default App;


// <Home/>