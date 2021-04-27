import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
      display: 'flex',
      alignItems: 'center',
    },
  },
});
class Login extends Component {
  state = {
    credentials: {username: '', password: ''}
  }

  login = event => {
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        this.props.userLogin(data.token);
      }
    )
    .catch( error => console.error(error))
  }

  register = event => {
    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        console.log(data.token);
      }
    )
    .catch( error => console.error(error))
  }
  
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

  render() {
    const { classes } = this.props;
    return (
      
      <div className= {classes.root} >
        <h1>Login user form</h1>
        <div>
        <form noValidate autoComplete="off">
          <TextField type="text" name="username"
           value={this.state.credentials.username}
           onChange={this.inputChanged} label="username"/>
        </form>
        <br/>
        <form>
        <TextField type="text" name="password"
           value={this.state.credentials.password}
           onChange={this.inputChanged} label="password"/>
        </form>
        </div>
        <br/>
        <div className="mr-2">
          <Button variant="contained" onClick={this.login}>Login</Button>
          <Button variant="contained" onClick={this.register}>Register</Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
