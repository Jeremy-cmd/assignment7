import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Table, Nav, Navbar, NavDropdown,  FormText, Form, NavLink, InputGroup, FormControl, Jumbotron} from 'react-bootstrap';
import {Link} from "react-router-dom";


class Debits extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newData: [],
            description: "",
            amount: 0,
            notNumber: false,
            debitAmount: 0,
            accountBalance: this.props.accountBalance,
            money: 0
        };

    }



      componentDidMount() {

          // this.getData();
          let API = 'https://moj-api.herokuapp.com/debits';
          fetch(API).then((response) => {
              if(response.status === 404){
                  return;
              }
              return response.json();

          }).then((data) => {

              let debitsData = JSON.stringify(data);
              console.log(debitsData);

              this.setState({data: JSON.parse(debitsData) });
          }).catch((error) => {
              console.log('Error', error);
          })

     }

   descriptionChange = (event) => {

       console.log(event.target.value);
        this.setState({description: event.target.value});

   }

   debitAmountChange = (event) => {
       console.log(event.target.value);
        let x = event.target.value;
        if(isNaN(x)) {
            this.setState({notNumber: true});
            return;

        }
        this.setState({notNumber: false});
        this.setState({amount: parseInt(event.target.value)});

   }

   addDebit = () => {

       this.setState((prevState, props) => {
           let newDebit = [];
           let currentTime = new Date();
           currentTime = currentTime.toString();


           for(let i=0; i<this.state.newData.length; i++){
               newDebit.push(this.state.newData[i]);
           }

           if(!this.state.notNumber) {
               newDebit.push(
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
                return {newData: newDebit, money:currentMoney};

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
                <Navbar.Brand href="#home">Debits</Navbar.Brand>
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
                            <Link to="/Credits">Credits</Link>
                        </Nav.Link>

                        <Nav.Link>
                            <Link to="/UserProfile">UserProfile</Link>
                        </Nav.Link>

                        <Nav.Link>
                            Account Balance: {this.state.accountBalance}
                        </Nav.Link>

                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Debit Description" className="mr-sm-2" onChange={this.descriptionChange} />
                        <FormControl type="text" placeholder="Debit Amount" className="mr-sm-2" onChange={this.debitAmountChange} />
                        <Button variant="outline-success" onClick={this.addDebit}>Submit</Button>
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

export default Debits;