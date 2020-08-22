import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, history } from "react-router-dom";

import '../App.css';
import Axios from 'axios';
import '../components/component.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Line } from 'react-chartjs-2';

import { Container, Dropdown, ButtonGroup, DropdownButton, Button, Col, Row, Table } from 'react-bootstrap';

export default function CryptoDashboard() {
    const [coinName, setCoinName] = useState();
    const [editModalShow, setEditModalShow] = useState(false);


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
            } else {
                window.location = '/';

            }

        }
        checkLoggedIn();


    }, []);
    const onSubmit = async (e) => {

    }
    const state = {
        labels: ['January', 'February', 'March',
            'April', 'May','January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56,65, 59, 80, 81, 56]
            }
        ]
    }

    return (

        <Container>
          
            <Row>
                <Col xs={8}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Enter 3 letter symbol for a crypto-currency (eg. BTC)" />
                    </div>
                </Col>
                <Col xs={4}>
                    <Button className="text-uppercase search-btn" variant="dark" type="submit">Search</Button>

                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4}>
                    <Line
                        data={state}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 20
                            },
                            legend: {
                                display: false,

                            }
                        }}
                        responsive
                    />
                </Col>
                <Col xs={12} md={4}>
                <Line
                        data={state}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 20
                            },
                            legend: {
                                display: false,

                            }
                        }}
                        responsive
                    />
                </Col>
                <Col xs={12} md={4}>
                <Line
                        data={state}
                        options={{
                            title: {
                                display: true,
                                text: 'Average Rainfall per month',
                                fontSize: 20
                            },
                            legend: {
                                display: false,

                            }
                        }}
                        responsive
                        // width={800}
                        // height={800}
                    />
                </Col>
            </Row>
        </Container>
    );
}
