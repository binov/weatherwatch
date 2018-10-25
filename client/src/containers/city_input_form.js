import React, { Component } from "react";
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import * as actions from "../actions";
import { connect } from "react-redux";
class CityInputForm extends Component {
  constructor(props) {
    super(props);

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleMinTempChange = this.handleMinTempChange.bind(this);
    this.handleMaxTempChange = this.handleMaxTempChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { country: "", city: "", minTemp: "", maxTemp: "" };
  }

  getCityValidationState() {
    //TODO
    return null;
  }

  getMaxTempValidationState() {
    //TODO
  }

  getMinTempValidationState() {
    //TODO
  }

  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }
  handleMinTempChange(e) {
    this.setState({ minTemp: e.target.value });
  }
  handleMaxTempChange(e) {
    this.setState({ maxTemp: e.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchWeather({
      countryCode: "US",
      cityName: this.state.city,
      minTemp: this.state.minTemp,
      maxTemp: this.state.maxTemp
    });
    this.setState({ country: "", city: "", minTemp: "", maxTemp: "" });
  }
  render() {
    var formGroupSpacing = { marginLeft: "1.5%" };
    var buttonSpacing = { marginTop: "1.8%", marginLeft: "2%" };
    return (
      <Form inline>
        <FormGroup style={formGroupSpacing} controlId="countrySelect">
          <div>
            <ControlLabel>Country</ControlLabel>
            <div>
              <FormControl componentClass="select" placeholder="select">
                <option value="US">US</option>
              </FormControl>
            </div>
          </div>
        </FormGroup>
        <FormGroup
          style={formGroupSpacing}
          controlId="cityName"
          validationState={this.getCityValidationState()}
        >
          <div>
            <ControlLabel>City Name</ControlLabel>
            <div>
              <FormControl
                type="text"
                value={this.state.city}
                placeholder="City Name"
                onChange={this.handleCityChange}
              />
            </div>
          </div>

          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          style={formGroupSpacing}
          controlId="minTemp"
          validationState={this.getMinTempValidationState()}
        >
          <div>
            <ControlLabel>Min Temp (in K)</ControlLabel>
            <div>
              {" "}
              <FormControl
                type="number"
                value={this.state.minTemp}
                placeholder="Min Temp (in K)"
                onChange={this.handleMinTempChange}
              />
            </div>
          </div>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          style={formGroupSpacing}
          controlId="maxTemp"
          validationState={this.getMaxTempValidationState()}
        >
          <div>
            <ControlLabel>Max Temp (in K)</ControlLabel>
            <div>
              <FormControl
                type="number"
                value={this.state.maxTemp}
                placeholder="Max Temp (in K)"
                onChange={this.handleMaxTempChange}
              />
            </div>
          </div>
          <FormControl.Feedback />
        </FormGroup>

        <Button
          bsStyle="primary"
          style={buttonSpacing}
          type="submit"
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
export default connect(
  null,
  actions
)(CityInputForm);
