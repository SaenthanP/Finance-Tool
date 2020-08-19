import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Axios from 'axios';
import './App.css';
import Navbar from "./components/navbar.component";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./components/landing-page.component";
import Login from "./components/login.component";
import Test from "./components/test.component";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
useEffect(() => {
  const checkLoggedIn = async () => {
    // if (localStorage.getItem('jwt')) {

        Axios({
            method: 'get',
            url: 'http://localhost:5000/api/users/isAuthenticated',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            }
        }).then(res=>{
          console.log(res.data);
          setLoggedIn(res);
        })
        .catch(err => {
     
            localStorage.removeItem('jwt');
        });
    // }

}
checkLoggedIn();

  // setLoggedIn(localStorage.getItem('jwt'));

}, []);
  return (
    <Router>
      <div className="container-fluid">
        <Navbar isAuthenticated={loggedIn} />

        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/app" exact component={Test} />


        </Switch>
      </div>
    </Router>
  );
}

export default App;
