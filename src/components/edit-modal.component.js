import React,{useState,useEffect} from 'react';
import '../components/component.css';
import { Modal, Button,  Alert } from 'react-bootstrap';
import { Container, Dropdown, ButtonGroup, DropdownButton,  Col, Row, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

export default function EditModal(props) {
    const [transactionDate, setTransactionDate] = useState(new Date());

    const [transactionTitle, setTransactionTitle] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(undefined);

    const [transactionType, setTransactionType] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("leedle");
             setTransactionTitle(props.transaction.transactionTitle);
     setTransactionDate(props.transaction.transactionDate);
     setTransactionAmount(props.transaction.transactionAmount);
     setTransactionType(props.transaction.transactionType);



    }, [props.transaction]);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                {        console.log(props.transaction.transactionTitle)}

                   <div className="card expense-input-card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Edit Transaction</h5>
                            <form  className="form-signin">
                                <div className="form-group">
                                    <label htmlFor="inputExpenseTitle">Transaction Title</label>
                                    <input type="text" className="form-control" value={transactionTitle} onChange={(e) => setTransactionTitle(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAmount">Amount</label>
                                    <input type="number" className="form-control" step="any" min="0" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}/>
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

                                            <Dropdown.Item eventKey="1"  onClick={() => setTransactionType("EXPENSE")}>Expense</Dropdown.Item>
                                            <Dropdown.Item eventKey="2" onClick={() => setTransactionType("INCOME")} >Income</Dropdown.Item>

                                        </DropdownType>
                                    ))}
                                    <input type="text" className="form-control" readOnly={true} defaultValue={transactionType}  />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDate">Date</label>
                                    <div>
                                        <DatePicker 
                                        />
                                    </div>
                                </div>



                                <button className="btn btn-lg btn-primary btn-block text-uppercase input-expense-btn" type="submit">Submit</button>

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