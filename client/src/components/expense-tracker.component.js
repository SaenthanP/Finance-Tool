import React, { useState, useEffect } from 'react';

import '../App.css';
import Axios from 'axios';
import '../components/component.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ErrorModal from '../components/error-modal.component';
import EditModal from '../components/edit-modal.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

import { Doughnut } from 'react-chartjs-2';

import { Container, Dropdown, ButtonGroup, DropdownButton, Button, Col, Row, Table } from 'react-bootstrap';


export default function ExpenseTracker() {
    const [transactionDate, setTransactionDate] = useState(new Date());
    const [transactions, setTransactions] = useState([]);

    const [transactionTitle, setTransactionTitle] = useState();
    const [transactionAmount, setTransactionAmount] = useState();

    const [transactionType, setTransactionType] = useState();
    const [error, setError] = useState();
    const [editModalShow, setEditModalShow] = useState(false);

    const [errorModalShow, setErrorModalShow] = useState(false);
 
    const[transactionToEdit,setTransactionToEdit]=useState([]);
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

      
        readTransactions();
        console.log("test");
    }, []);
    const readTransactions = async () => {
        setEditModalShow(false);
        await Axios({
            method: 'get',
            url: 'http://localhost:5000/api/protected/income//getHistory',
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },

        }).then(res => {
            setTransactions(res.data);
            // calculateNetworth(res.data);

        });

    }
    const calculateNetworth =  () => {
        var incomeTotal=0;
        var expenseTotal=0;
        for (var transactionIndex = 0; transactionIndex < transactions.length; transactionIndex++) {
            if (transactions[transactionIndex].transactionType === 'INCOME') {
                incomeTotal+= transactions[transactionIndex].transactionAmount;
                // setIncome(income=>income + transactions[transactionIndex].transactionAmount);

            } else {
                expenseTotal+= transactions[transactionIndex].transactionAmount;

                // setExpense(expense=>expense + transactions[transactionIndex].transactionAmount)

            }
        }
    return(
    <Doughnut
        data={{
            labels: ['Expense', 'Income'],
            datasets: [
                {
                    backgroundColor: [
                        "#8e5ea2",
                        "#c45850",

                    ],

                    data: [ expenseTotal,incomeTotal]
                }
            ]
        }}
        options={{
            title: {
                display: true,
                text: 'Transactions',
                fontSize: 20
            },
            legend: {
                display: true,
                position: 'top'
            },
            responsive: true,
            maintainAspectRatio: false,
        }}
        width={400}
        height={400}
    />);


    }
    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            e.target.reset();

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
                setTransactions([res.data, ...transactions]);
                calculateNetworth(transactions);
                setTransactionAmount(undefined);
                setTransactionTitle(undefined);
                setTransactionDate(undefined);
                setTransactionType(undefined);

          
            });
        } catch (err) {
            setError(err.response.data.Error);
            setErrorModalShow(true);
        }
    }
    const onChangeDate = (date) => {
        setTransactionDate(date);
    }
    const deletetransaction = async (id) => {
        await Axios({
          method: 'delete',
          url: 'http://localhost:5000/api/protected/income/deleteTransaction/'+id,
          headers: {
            'Authorization': localStorage.getItem('jwt'),
          },
        }).then(res => {
          setTransactions(res.data);
        });
      }
      const editTransaction=async(transaction)=>{
          setTransactionToEdit(transaction);
        setEditModalShow(true);
      }
    const Transactions = (props) => {
        let amount = props.transaction.transactionAmount;
        if (props.transaction.transactionType === 'EXPENSE') {
            amount = "-$" + amount;
        } else {
            amount = "$" + amount;
        }
        return (
            <tbody>
                <tr>

                    <td key={props.transaction._id}>{props.transaction.transactionTitle}</td>
                    <td  >{props.transaction.transactionType}</td>
                    <td  >{amount}</td>
                    <td  >{props.transaction.transactionDate.substring(0,10)}</td>
        <td  className="test"><Button id="edit-button" onClick={()=>editTransaction(props.transaction)}><FontAwesomeIcon icon={faEdit} /></Button><Button id="delete-button" onClick={()=>deletetransaction(props.transaction._id)}><FontAwesomeIcon icon={faTrashAlt} /></Button> </td>



                </tr>

            </tbody>
        );
    }

    return (

        <Container >
              <EditModal
                show={editModalShow}
                onHide={() => readTransactions()}
               transaction={transactionToEdit}
            />
            <ErrorModal
                show={errorModalShow}
                onHide={() => setErrorModalShow(false)}
                error={error}
            />
            <Row>
                <Col xs="12" md="6">
                    <div className="networth-chart">
                        {calculateNetworth()}
                    </div>
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
                                    <input type="number" className="form-control" step="any" min="0" placeholder="Amount" onChange={(e) => setTransactionAmount(e.target.value)} />
                                </div>
                                <div className="form-group">

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
                                <div className="form-group">
                                    <label htmlFor="inputDate">Date</label>
                                    <div>
                                        <DatePicker selected={transactionDate} onChange={onChangeDate}
                                        />
                                    </div>
                                </div>



                                <button className="btn btn-lg btn-primary btn-block text-uppercase input-expense-btn" type="submit">Submit</button>

                            </form>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs="12" >
                    <Table className="income-table" striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Transaction Name</th>
                                <th>Transaction Type</th>

                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit/Delete</th>


                            </tr>
                        </thead>

                        {transactions.map(currentTransaction => <Transactions transaction={currentTransaction} key={currentTransaction._id} />)}


                    </Table>
                </Col>

            </Row>
        </Container>
    );
}
