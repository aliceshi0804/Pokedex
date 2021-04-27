import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
      display: "center",
    },
  },
});

class Login extends Component {
  state = {
    credentials: { username: "", password: "" },
  };

  login = (event) => {
    fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.credentials),
    })
      .then((data) => data.json())
      .then((data) => {
        this.props.userLogin(data.token);
      })
      .catch((error) => console.error(error));
  };

  register = (event) => {
    fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.credentials),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.token);
        alert("✔️ This works on every component!");
      })
      .catch((error) => console.error(error));
  };

  inputChanged = (event) => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root} maxWidth="xs">
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="text"
                    name="username"
                    value={this.state.credentials.username}
                    onChange={this.inputChanged}
                    label="Username"
                  />

                  <TextField
                    fullWidth
                    type="text"
                    name="password"
                    value={this.state.credentials.password}
                    onChange={this.inputChanged}
                    label="Password"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                fullWidth
                variant="contained"
                onClick={this.login}
              >
                Log in
              </Button>
              <br />
              <br />
              <Button
                color="secondary"
                fullWidth
                variant="contained"
                onClick={this.register}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);