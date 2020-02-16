import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./loginForm";
import HomeScreen from "./home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false
    };
  }
  loggedIn = () => {
    this.setState({
      loginStatus: true
    });
  };
  logout = () => {
    this.setState({
      loginStatus: false
    });
  };
  render() {
    return (
      <div className="App">
        {!this.state.loginStatus && (
          <LoginForm
            login={() => {
              this.loggedIn();
            }}
          />
        )}
        {this.state.loginStatus && (
          <HomeScreen
            logout={() => {
              this.logout();
            }}
          />
        )}
      </div>
    );
  }
}

export default App;
