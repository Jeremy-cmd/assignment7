import React, {Component} from 'react';
import axios from 'axios';

class Credits extends Component{

    constructor() {
        super();
        this.state = {
            data: []
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

    getData = async () => {

        let API = 'https://moj-api.herokuapp.com/credits';

        try{
            let response = await axios.get(API).data;
            console.log("this is the response " + response);
            let a  = JSON.stringify(response);
            let x = [];
            x.push(JSON.parse(a));
            this.setState({data: x});


        }catch (e) {
            console.log(e.error);

        }




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
                <h1>Credits</h1>

                <table>
                    <tbody>
                    {this.showData()}


                    </tbody>
                </table>

            </div>
        );
    }

}

export default Credits;