import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, history } from "react-router-dom";

import '../App.css';
import Axios from 'axios';
import '../components/component.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


import { Container,Dropdown, ButtonGroup, DropdownButton, Button, Col, Row } from 'react-bootstrap';


export default function ExpenseTracker() {
    const [date, setDate] = useState(new Date());
    const [transactionType, setTransactionType] = useState();

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
    const onChangeDate=(date)=>{
        setDate(date);
    }
    return (

        <Container>
            <Row>
                <Col xs="12" md="6">

                </Col>
                <Col xs="12" md="6">

                    <div className="card expense-input-card">
                        <div className="card-body">


                            <h5 className="card-title text-center">Expense Input</h5>
                            <form onSubmit={onSubmit} className="form-signin">
                                <div className="form-group">
                                    <label htmlFor="inputExpenseTitle">Expense Title</label>
                                    <input type="text" className="form-control" placeholder="Title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAmount">Amount</label>
                                    <input type="text" className="form-control" placeholder="Amount" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDate">Date</label>
                                    <div>
                                    <DatePicker selected={date} onChange={onChangeDate}
                                    />
                                    </div>
                                    {[DropdownButton].map((DropdownType, idx) => (
                            <DropdownType
                                as={ButtonGroup}
                                key={idx}
                                id={`dropdown-button-drop-${idx}`}
                                size="sm"
                                variant="secondary"
                                title="Transaction Type"
                                className="sort-drop-down">

                                <Dropdown.Item eventKey="1" onClick={() => setTransactionType("EXPENSE")}>Expense</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={() => setTransactionType("INCOME")}>Income</Dropdown.Item>

                            </DropdownType>
                        ))}
                <input type="text" className="form-control" readOnly = {true}  defaultValue={transactionType}/>

                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase input-expense-btn" type="submit">Submit</button>

                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
