import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Credits from './components/Credits';
import Debits from './components/Debits';


class App extends Component{

  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      currentUser: {
          userName: 'bob_loblaw',
          memberSince: '08/23/99',
      }
    }
  }

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);

    //way to pass props to a component
      const UserProfileComponent = () => (
          <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
      );

      const debitsPage = () => (
          <Debits accountBalance={this.state.accountBalance}/>
      );

      const creditsPage = () => (
          <Credits accountBalance={this.state.accountBalance}/>
      );


    return(
        <Router>
            {/*paths for each page*/}
            <div>
                <Route exact path="/" render={HomeComponent}/>
                <Route exact path="/userProfile" render={UserProfileComponent}/>
                <Route exact path="/Debits" render={debitsPage}/>
                <Route exact path="/Credits" render={creditsPage}/>

            </div>
        </Router>
    );
  }
}

export default App;
