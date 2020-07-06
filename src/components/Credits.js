import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Table, NavLink, InputGroup, FormControl, Jumbotron, Navbar, Nav, Form} from 'react-bootstrap';
import {Link} from "react-router-dom";

class Credits extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newData: [],
            description: "",
            amount: 0,
            notNumber: false,
            creditAmount: 0,
            accountBalance: this.props.accountBalance,
            money: 0
        };

    }



    componentDidMount() {

        // this.getData();
        let API = 'https://moj-api.herokuapp.com/credits';
        fetch(API).then((response) => {
            if(response.status === 404){
                return;
            }
            return response.json();

        }).then((data) => {

            let creditsData = JSON.stringify(data);
            console.log(creditsData);

            this.setState({data: JSON.parse(creditsData) });
        }).catch((error) => {
            console.log('Error', error);
        })

    }

    descriptionChange = (event) => {

        console.log(event.target.value);
        this.setState({description: event.target.value});

    }

    creditAmountChange = (event) => {
        console.log(event.target.value);
        let x = event.target.value;
        if(isNaN(x)) {
            this.setState({notNumber: true});
            return;

        }
        this.setState({notNumber: false});
        this.setState({amount: parseInt(event.target.value)});

    }

    addCredit = () => {

        this.setState((prevState, props) => {
            let newCredit = [];
            let currentTime = new Date();
            currentTime = currentTime.toString();


            for(let i=0; i<this.state.newData.length; i++){
                newCredit.push(this.state.newData[i]);
            }

            if(!this.state.notNumber) {
                newCredit.push(
                    <th>{this.state.description}</th>,
                    <tr>
                        <p> Amount: {this.state.amount} </p>
                        <p> Date: {currentTime}</p>
                    </tr>
                )
            }
            let x = this.state.amount;
            let currentMoney = this.state.money;
            currentMoney += x;
            return {newData: newCredit, money:currentMoney};

        });

    }

    showData = () => {


        let table = [];


        for(let i=0; i<this.state.data.length; i++){
            table.push(
                <th>{this.state.data[i].description}</th>,
                <tr>
                    <p> Amount: {this.state.data[i].amount} </p>
                    <p> Date: {this.state.data[i].date} </p>
                </tr>
            )

        }

        for(let i=0; i<this.state.newData.length; i++){
            table.push(this.state.newData[i]);
        }


        return table;


    }


    render() {

        return (
            <div>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Credits</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                            <Nav.Link>
                                <Link to={{
                                    pathname: "/",
                                    state:{
                                        debitAmount: this.state.debitAmount
                                    }
                                }}>Home</Link>

                            </Nav.Link>

                            <Nav.Link href="#link">
                                <Link to="/Debits">Debits</Link>
                            </Nav.Link>

                            <Nav.Link>
                                <Link to="/UserProfile">UserProfile</Link>
                            </Nav.Link>

                            <Nav.Link>
                                Account Balance: {this.state.accountBalance}
                            </Nav.Link>

                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Credit Description" className="mr-sm-2" onChange={this.descriptionChange} />
                            <FormControl type="text" placeholder="Credit Amount" className="mr-sm-2" onChange={this.creditAmountChange} />
                            <Button variant="outline-success" onClick={this.addCredit}>Submit</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>,


                <table className="table-responsive-sm table-bordered table-hover d-sm-table  table-striped dataTable">
                    <tbody>
                    {this.showData()}


                    </tbody>
                </table>

            </div>
        );
    }

}

export default Credits;