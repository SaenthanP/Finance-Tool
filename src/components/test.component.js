import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';
import '../components/component.css';


import { Button, Dropdown, ButtonGroup, DropdownButton, Col, Row } from 'react-bootstrap';


export default function Test() {

    useEffect(() => {

        // const checkLoggedIn = async () => {
        //     if (localStorage.getItem('jwt')) {

        //         Axios({
        //             method: 'get',
        //             url: 'http://localhost:5000/api/users/isAuthenticated',
        //             headers: {
        //                 'Authorization': localStorage.getItem('jwt'),
        //             }
        //         }).catch(err => {
        //             window.location = '/';
        //             localStorage.removeItem('jwt');
        //         });
        //     }

        // }
        // checkLoggedIn();


       
    }, []);

    
    return (

       <p>hello in app</p>

    );
}
