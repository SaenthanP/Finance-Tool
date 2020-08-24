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
    const [weeklyHistory, setWeeklyHistory] = useState([]);
    const [test, setTest] = useState({ x: [], y: [] });

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
        getDailyPriceHistory();


    }, []);
    const price = {
        x: [], y: []
    };
    const getDailyPriceHistory = async () => {
        await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            data: {
                "choice": "DAILY",
                "currencyFrom": "BTC",
                "currencyTo": "CAD"
            }
        }).then(res => {
            // console.log(res.data);
            const dailySeries = res.data["Time Series (Digital Currency Daily)"]
            const series = Object.keys(dailySeries).map(day => {
                return { day: day, value: dailySeries[day]["1a. open (CAD)"] }
            });
            // console.log(series[142]);

       
           
        });
    }
    const getWeeklyPriceHistory = async () => {
        await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            data: {
                "choice": "WEEKLY",
                "currencyFrom": "BTC",
                "currencyTo": "CAD"
            }
        }).then(res => {
            // console.log(res.data);
            const weeklySeries = res.data["Time Series (Digital Currency Weekly)"]
            const series = Object.keys(weeklySeries).map(day => {
                return { day: day, value: weeklySeries[day]["1a. open (CAD)"] }
            });
            console.log(series[142]);

       
           
        });
    }
    const getMonthlyPriceHistory = async () => {
        await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            data: {
                "choice": "MONTHLY",
                "currencyFrom": "BTC",
                "currencyTo": "CAD"
            }
        }).then(res => {
            // console.log(res.data);
            const monthlySeries = res.data["Time Series (Digital Currency Monthly)"]
            const series = Object.keys(monthlySeries).map(day => {
                return { day: day, value: monthlySeries[day]["1a. open (CAD)"] }
            });
            console.log(series[142]);

       
           
        });
    }
    const onSubmit = async (e) => {

    }
    const state = {
        labels: ['January', 'February', 'March',
            'April', 'May', 'January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56]
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
                <Col xs={12} md={12}>
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

                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        width={600}
                        height={600}

                    />
                </Col>


            </Row>
            <Row>
                <Col xs={12} md={12}>
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

                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        width={600}
                        height={600}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12}>
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

                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                        width={600}
                        height={600}
                    />
                </Col>
            </Row>

        </Container>
    );
}
