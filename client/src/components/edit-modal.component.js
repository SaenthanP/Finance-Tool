import React, { useState, useEffect } from 'react';
import '../components/component.css';
import { Modal, Button} from 'react-bootstrap';
import {  Dropdown, ButtonGroup, DropdownButton} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import ErrorModal from './error-modal.component';
export default function EditModal(props) {
    const [transactionDate, setTransactionDate] = useState(new Date());

    const [transactionTitle, setTransactionTitle] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(undefined);

    const [transactionType, setTransactionType] = useState("");
    const [error, setError] = useState("");
    const [errorModalShow, setErrorModalShow] = useState();

    useEffect(() => {
        setTransactionTitle(props.transaction.transactionTitle);
        setTransactionDate(props.transaction.transactionDate);
        setTransactionAmount(props.transaction.transactionAmount);
        setTransactionType(props.transaction.transactionType);
    }, [props.transaction]);

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            e.target.reset();
            await Axios({
                method: 'put',
                url: 'http://localhost:5000/api/protected/income/editTransaction/'+props.transaction._id,
                headers: {
                    'Authorization': localStorage.getItem('jwt'),
                },
                data: {
                    transactionTitle,
                    transactionType,
                    transactionAmount,
                    transactionDate
                }
            }).then(res => {
                console.log(res.data);
                props.onHide();
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
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ErrorModal
                show={errorModalShow}
                onHide={() => setErrorModalShow(false)}
                error={error}
            />
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="card expense-input-card">
                    <div className="card-body">
                        <h5 className="card-title text-center">Edit Transaction</h5>
                        <form onSubmit={onSubmit} className="form-signin">
                            <div className="form-group">
                                <label htmlFor="inputExpenseTitle">Transaction Title</label>
                                <input type="text" className="form-control" value={transactionTitle || ""} onChange={(e) => setTransactionTitle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAmount">Amount</label>
                                <input type="number" className="form-control" step="any" min="0" value={transactionAmount || 0} onChange={(e) => setTransactionAmount(e.target.value)} />
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
                                        <Dropdown.Item eventKey="2" onClick={() => setTransactionType("INCOME")} >Income</Dropdown.Item>

                                    </DropdownType>
                                ))}
                                <input type="text" className="form-control" readOnly={true} defaultValue={transactionType || ""} />

                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDate">Date</label>
                                <div>
                                    <DatePicker selected={Date.parse(transactionDate)} onChange={onChangeDate}
                                    />
                                </div>
                            </div>



                            <button className="btn btn-lg btn-primary btn-block text-uppercase input-expense-btn" type="submit">Confirm</button>

                        </form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );

}