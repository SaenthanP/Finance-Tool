import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Axios from 'axios';
import './App.css';
import Navbar from "./components/navbar.component";
import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./components/landing-page.component";
import Login from "./components/login.component";
import ExpenseTracker from "./components/expense-tracker.component";
import Register from "./components/register.component";
import CryptoDashboard from "./components/crypto-dashboard.component";

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


}, []);
  return (
    <Router>
      <div className="container-fluid">
        <Navbar isAuthenticated={loggedIn} />

        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/app" exact component={ExpenseTracker} />
          <Route path="/crypto" exact component={CryptoDashboard} />


        </Switch>
      </div>
    </Router>
  );
}

export default App;
