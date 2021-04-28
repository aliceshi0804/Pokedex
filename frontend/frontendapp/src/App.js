import React, { useState } from 'react';
import Login from './components/Login';
import Homepage from './components/Homepage';
import {Switch,Route} from 'react-router-dom'

class App extends React.Component {
  // [token, setToken] = useState('');
  state={
    isLog:false
  }
  handleLogin = (isLog) => this.setState({isLog})

  // userLogin = (tok) => {
  //   setToken(tok);
  // }
  render() {
    const {isLog} = this.state;
  return (
    <div>
      <Switch>
        {
          !isLog ?
          <Route exact path='/' render={() => <Login isLogin={this.handleLogin}/>}/>
            :
          <Route path='/' render={() =><Homepage handleLogged={this.handleLogin}/> }/>
        }
      </Switch>
    </div>
      // token === '' ? <Login userLogin={userLogin} /> : <Homepage />
  );
      }
}

export default App;