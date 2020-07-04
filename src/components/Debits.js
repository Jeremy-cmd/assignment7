import React, {Component} from 'react';
import axios from 'axios';
import { Button, Table, NavLink, InputGroup, FormControl, Jumbotron} from 'react-bootstrap';

class Debits extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            description: "",
            amount: 0
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
        this.setState({description: event.target.value})

   }

   debitAmountChange = (event) => {
       console.log(event.target.value);

        this.setState({amount: parseInt(event.target.value)})

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

            return table;







    }


    render() {

        return (
            <div>
                <h1>Debits</h1>

                <form>

                    <div id="input" className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputPassword" placeholder="Add Debit Description"
                                   onChange={this.descriptionChange}/>
                            <input type="text" className="form-control" id="inputPassword" placeholder="Add Debit Amount"
                            onChange={this.debitAmountChange}/>
                            <Button variant="primary" >Submit</Button>
                        </div>
                    </div>
                </form>

                <table>
                    <tbody>
                    {this.showData()}


                    </tbody>
                </table>

            </div>
        );
    }

}

export default Debits;