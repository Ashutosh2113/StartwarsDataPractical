import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import _ from "lodash";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      inputValue: "",
      searched: false,
      data: [],
      showPlanetDetails: false
    };
    this.search = _.debounce(this.makeSearch, 3000);
  }
  onChange = event => {
    event.persist();
    this.setState({
      inputValue: event.target.value,
      showPlanetDetails: false
    });
    if (event.target.value.length >= 2) {
      this.search(event);
    }
  };
  makeSearch = event => {
    const { value } = event.target;
    this.setState({
      isLoading: true
    });
    //console.log(value);
    // if (value) {
    fetch(`https://swapi.co/api/planets/?search=${value}`)
      .then(res => res.json())
      .then(
        result => {
          // debugger;
          // console.log(_.sortBy(result.results, i => {
          //     if(i.population != 'unknown')
          //     return i.population;
          //   }))
          this.setState({
            isLoading: false,
            data: _.orderBy(
              result.results,
              [
                i => {
                  if (i.population != "unknown")
                    i.populationTemp = parseInt(i.population);
                  else {
                    i.populationTemp = 0;
                  }
                  return i.populationTemp;
                }
              ],
              ["desc"]
            ),
            searched: true
          });
          console.log(result.results);
        },
        error => {
          this.setState({
            isSubmitting: false
          });
        }
      );
    // }
  };
  componentDidMount = () => {
    console.log("Home compoennt Mounted");
  };
  render() {
    return (
      <div>
        <Button
          type="submit"
          value="Submit"
          //disabled={this.state.isSubmitting ? true : false}
          onClick={() => {
            this.props.logout();
          }}
        >
          Logout
        </Button>
        <br />
        <br />
        <h6 style={{ color: "red" }}>Minimum search length is 2</h6>
        <br />
        {!this.state.isLoading ? (
          <div>
            <input
              value={this.state.inputValue}
              placeholder="Search using Planet name"
              onChange={this.onChange.bind(this)}
            />
          </div>
        ) : (
          <div>
            <h3>Please wait we a loading the data...</h3>
          </div>
        )}
        {this.state.searched &&
        this.state.data.length == 0 &&
        this.state.inputValue.length > 0 ? (
          <div>No data Found!</div>
        ) : (
          <div>
            {_.map(this.state.data, i => {
              return (
                <div
                  onClick={() => {
                    this.setState({ showPlanetDetails: true, planetData: i });
                  }}
                  key={i.name}
                >
                  {i.name}({i.population})
                </div>
              );
            })}
          </div>
        )}
        {this.state.showPlanetDetails && (
          <div
            style={{
              //float: "left",
              padding: "10px",
              border: "1px solid black",
              textAlign: "left"
            }}
          >
            <label>Name : </label>
            {this.state.planetData.name}
            <br />
            <label>Rotation Peroid : </label>
            {this.state.planetData.rotation_period}
            <br />
            <label>Orbital Period : </label>
            {this.state.planetData.orbital_period}
            <br />
            <label>Diameter : </label>
            {this.state.planetData.diameter}
            <br />
            <label>Climate : </label>
            {this.state.planetData.climate}
            <br />
            <label>Gravity : </label>
            {this.state.planetData.gravity}
            <br />
            <label>Surface Water : </label>
            {this.state.planetData.surface_water}
            <br />
            <label>Terrian : </label>
            {this.state.planetData.terrain}
            <br />
          </div>
        )}
      </div>
    );
  }
}
