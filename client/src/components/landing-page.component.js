import React, { useEffect } from 'react';
import '../App.css';

import Axios from 'axios';
import { Container, Dropdown, ButtonGroup, DropdownButton, Button, Col, Row, Table, InputGroup, FormControl } from 'react-bootstrap';

export default function HomePage() {


    useEffect(() => {

        const checkLoggedIn = async () => {
            if (localStorage.getItem('jwt')) {

                Axios({
                    method: 'get',
                    url: 'http://localhost:5000/api/users/isAuthenticated',
                    headers: {
                        'Authorization': localStorage.getItem('jwt'),
                    }
                }).catch(err => {
                    window.location = '/';
                    localStorage.removeItem('jwt');
                });
            }

        }
        checkLoggedIn();
    }, []);




    return (
        <Container fluid>
            <div className="section-1">
                <Row>
                    <Col xs={12} lg={6}>
                        <img className="section-1-img" src={require("../components/assets/banner.jpg")} alt="saving money graphic Designed by rawpixel.com / Freepik" />
                        <Row>
                            <Col xs={12 }>
                            <a href='https://www.freepik.com/vectors/people'>People vector created by pch.vector - www.freepik.com</a>

                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} lg={6} >
                    
                <div className="text-container">
                        <Row>
                            <Col xs={12}>
                            <h1 id="Header">TRACK YOUR EXPENSES!</h1>

                            </Col>

                        </Row>
                        <Row>
                            <Col xs={12}>
                            <h2 id="Sub-Header">EXPLORE THE WORLD OF CRYPTO!</h2>

                            </Col>

                        </Row>
                        <Row>
                            <Col xs={12}>
                                <p id="description">We bring you the ability to track all your transactions from income to expenses. All transactions are
                                displayed in a neat table with editable features! All your information is safe and secure from unauthorized access.
                                Not only that, you can also search hundreds of crypto-currencies and view its prices histories, health index such as its 
                                Fundamental Score or its Market Maturity Score. We also offer a currency converter to add convenience.</p>
                            </Col>
                        </Row>
                        </div>
                    {/* </div> */}
                    </Col>
                </Row>
            </div>
        </Container>




    );
}
