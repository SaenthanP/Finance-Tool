import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, history } from "react-router-dom";

import '../App.css';
import Axios from 'axios';
import '../components/component.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Line } from 'react-chartjs-2';
import ErrorModal from '../components/error-modal.component';

import { Container, Dropdown, ButtonGroup, DropdownButton, Button, Col, Row, Table } from 'react-bootstrap';

export default function CryptoDashboard() {
    const [coinName, setCoinName] = useState("");
    const [editModalShow, setEditModalShow] = useState(false);
    const [weeklyHistory, setWeeklyHistory] = useState({ x: [], y: [] });
    const [dailyHistory, setDailyHistory] = useState({ x: [], y: [] });
    const [monthlyHistory, setMonthlyHistory] = useState({ x: [], y: [] });
    const [errorModalShow, setErrorModalShow] = useState(false);
    const [error, setError] = useState();

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

    const getDailyPriceHistory = async () => {
        try{
        await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            data: {
                "choice": "DAILY",
                "currencyFrom": coinName,
                "currencyTo": "CAD"
            }
        }).then(res => {
            // console.log(res.data);
            const dailySeries = res.data["Time Series (Digital Currency Daily)"]
            const series = Object.keys(dailySeries).map(day => {
                return { day: day, value: dailySeries[day]["4a. close (CAD)"] }
            });

            var x_axis = [];
            var y_axis = [];
            var days;
            if(series.length<100){
                days=series.length;
            }else{
                days=100;
            }
            for (var index = 0; index < days; index++) {
                x_axis.push(series[index].day);
                y_axis.push(series[index].value)

            }
            setDailyHistory({ x: x_axis, y: y_axis });
            setCoinName("");

        });

    }catch(err){
         setError(err.response.data.Error);
            setErrorModalShow(true);
    }
    }
    const getWeeklyPriceHistory = async () => {
        try{
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
                return { day: day, value: weeklySeries[day]["4a. close (CAD)"] }
            });
            var x_axis = [];
            var y_axis = [];
            var weeks;
            if(series.length<100){
                weeks=series.length;
            }else{
                weeks=100;
            }
            for (var index = 0; index < weeks; index++) {
                x_axis.push(series[index].day);
                y_axis.push(series[index].value)

            }
            setWeeklyHistory({ x: x_axis, y: y_axis });



        });
    }catch(err){
         setError(err.response.data.Error);
            setErrorModalShow(true);
    }
    }
    const getMonthlyPriceHistory = async () => {
        try{
        await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/protected/vantage-api/getHistory',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
            data: {
                "choice": "MONTHLY",
                "currencyFrom": coinName,
                "currencyTo": "CAD"
            }
        }).then(res => {
            console.log(res.data);
            const monthlySeries = res.data["Time Series (Digital Currency Monthly)"]
            const series = Object.keys(monthlySeries).map(day => {
                return { day: day, value: monthlySeries[day]["4a. close (CAD)"] }
            });
            var x_axis = [];
            var y_axis = [];
            var months;
            if(series.length<100){
                months=series.length;
            }else{
                months=100;
            }
            for (var index = 0; index < months; index++) {
                x_axis.push(series[index].day);
                y_axis.push(series[index].value)

            }
            setMonthlyHistory({ x: x_axis, y: y_axis });



        });

    }catch(err){
         setError(err.response.data.Error);
            setErrorModalShow(true);
    }
    }
    const onSubmit = async (e) => {
        console.log("yeey");
        try {
            e.preventDefault();
            e.target.reset();

            console.log(coinName);
            getDailyPriceHistory();
            getWeeklyPriceHistory();
            getMonthlyPriceHistory();

    setCoinName("");
        } catch (err) {
            console.log("reach");
            console.log(err.response.data.Error);
            // setError(err.response.data.Error);
            // setModalShow(true);
        }

    }
    const state = {
        labels: dailyHistory.x,
        datasets: [
            {
                label: 'Daily',
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dailyHistory.y
            }
        ]
    }

    return (

        <Container>      
               <ErrorModal
        show={errorModalShow}
        onHide={() => setErrorModalShow(false)}
        error={error}
    />
            <form onSubmit={onSubmit} className="form-search-coin-group">

                <Row>

                    <Col xs={8}>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Enter 3 letter symbol for a crypto-currency (eg. BTC)" onChange={(e) => setCoinName(e.target.value)} />
                        </div>
                    </Col>
                    <Col xs={4}>
                        <Button className="text-uppercase search-btn" variant="dark" type="submit" disabled={coinName<=0}>Search</Button>
                    </Col>

                </Row>
                </form>

                <Row>
                    <Col xs={12} md={12}>
                        <Line
                            data={{
                                labels: dailyHistory.x,
                                datasets: [
                                    {
                                        label: 'Daily',
                                        fill: false,
                                        lineTension: 0,
                                        backgroundColor: 'rgba(75,192,192,1)',
                                        borderColor: 'rgba(0,0,0,1)',
                                        borderWidth: 2,
                                        data: dailyHistory.y
                                    }
                                ]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Daily price (past 100 days)',
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
                            data={{
                                labels: weeklyHistory.x,
                                datasets: [
                                    {
                                        label: 'Daily',
                                        fill: false,
                                        lineTension: 0,
                                        backgroundColor: 'rgba(75,192,192,1)',
                                        borderColor: 'rgba(0,0,0,1)',
                                        borderWidth: 2,
                                        data: weeklyHistory.y
                                    }
                                ]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Weekly price (past 100 weeks)',
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
                            data={{
                                labels: monthlyHistory.x,
                                datasets: [
                                    {
                                        label: 'Daily',
                                        fill: false,
                                        lineTension: 0,
                                        backgroundColor: 'rgba(75,192,192,1)',
                                        borderColor: 'rgba(0,0,0,1)',
                                        borderWidth: 2,
                                        data: monthlyHistory.y
                                    }
                                ]
                            }}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Monthly price',
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
