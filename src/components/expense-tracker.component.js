import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, history } from "react-router-dom";

import '../App.css';
import Axios from 'axios';
import '../components/component.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ErrorModal from '../components/error-modal.component';


import { Container, Dropdown, ButtonGroup, DropdownButton, Button, Col, Row,Table } from 'react-bootstrap';


export default function ExpenseTracker() {
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [transactions, setTransactions] = useState([]);

    const [transactionTitle, setTransactionTitle] = useState();
    const [transactionAmount, setTransactionAmount] = useState();

    const [transactionType, setTransactionType] = useState();
    const [error, setError] = useState();

    const [errorModalShow, setErrorModalShow] = useState(false);

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
        try {
            e.preventDefault();

            await Axios({
                method: 'post',
                url: 'http://localhost:5000/api/protected/income/addTransaction',
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                },
                data: {
                   transactionTitle,
                   transactionAmount,
                   transactionDate,
                   transactionType
                }
            }).then(res => {
                // setMovies(res.data);
                // // setMovieTitle("");
            });
        } catch (err) {
            setError(err.response.data.Error);
            setErrorModalShow(true);
        }
    }
    const onChangeDate = (date) => {
        setTransactionDate(date);
    }
    return (

        <Container>
               <ErrorModal
                            show={errorModalShow}
                            onHide={() => setErrorModalShow(false)}
                            error={error}

                        />
            <Row>
                <Col xs="12" md="6">

                </Col>
                <Col xs="12" md="6">

                    <div className="card expense-input-card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Input Transaction</h5>
                            <form onSubmit={onSubmit} className="form-signin">
                                <div className="form-group">
                                    <label htmlFor="inputExpenseTitle">Transaction Title</label>
                                    <input type="text" className="form-control" placeholder="Title" onChange={(e) => setTransactionTitle(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAmount">Amount</label>
                                    <input type="number" className="form-control" placeholder="Amount" onChange={(e)=>setTransactionAmount(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDate">Date</label>
                                    <div>
                                        <DatePicker selected={transactionDate} onChange={onChangeDate}
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
                                    <input type="text" className="form-control" readOnly={true} defaultValue={transactionType} />

                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase input-expense-btn" type="submit">Submit</button>

                            </form>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs="12" >
                <Table className="income-table" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Transaction Name</th>
                                            <th>Transaction Type</th>

                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Delete/Edit</th>


                                        </tr>
                                    </thead>



            </Table>
                </Col>
               
            </Row>
        </Container>
    );
}
