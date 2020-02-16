import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import _ from "lodash";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: "",
      passWord: "",
      isSubmitting: false
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    //console.log("https://swapi.co/api/people/?search=" + this.state.UserName);
    if (!this.state.UserName || !this.state.passWord) {
      alert("UserName and Password are Required Fields");
      return false;
    } else {
      this.setState({
        isSubmitting: true
      });
      fetch(`https://swapi.co/api/people/?search=${this.state.UserName}`)
        .then(res => res.json())
        .then(
          result => {
            const t1 = _.find(result.results, i => {
              return (
                i.name === this.state.UserName &&
                i.birth_year === this.state.passWord
              );
            });
            console.log(t1);
            if (!t1) {
              alert("Invalide login and passwords");
            } else {
              this.setState({
                isSubmitting: false
              });
              this.props.login();
            }
          },
          error => {
            this.setState({
              isSubmitting: false
            });
          }
        );
      //   setTimeout(() => {
      //     //console.log("Enabled button");
      //     this.setState({
      //       isSubmitting: false
      //     });
      //     this.props.login();
      //   }, 3000);
      //   console.log("All Good");
    }
  };
  handleChange = (event, type) => {
    //console.log(event.target.value, type);
    switch (type) {
      case "username":
        this.setState({
          UserName: event.target.value
        });
        break;
      case "password":
        this.setState({
          passWord: event.target.value
        });
        break;
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          UserName:
          <input
            value={this.state.UserName}
            onChange={e => {
              this.handleChange(e, "username");
            }}
          />
        </label>
        <label>
          Password:
          <input
            type={"password"}
            value={this.state.passWord}
            onChange={e => {
              this.handleChange(e, "password");
            }}
          />
        </label>
        <br />
        <Button
          type="submit"
          value="Submit"
          disabled={this.state.isSubmitting ? true : false}
        >
          Submit
        </Button>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    );
  }
}
