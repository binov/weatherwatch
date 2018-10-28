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
import { countryData } from "../components/country_codes";
import ErrorMsg from "../components/error_msg";
class CityInputForm extends Component {
  constructor(props) {
    super(props);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleMinTempChange = this.handleMinTempChange.bind(this);
    this.handleMaxTempChange = this.handleMaxTempChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.defaultCountryCode = "US";
    this.state = {
      country: this.defaultCountryCode,
      city: "",
      minTemp: "",
      maxTemp: "",
      cityValidationState: null,
      minTempValidationState: null,
      maxTempValidationState: null
    };
  }

  handleCountryChange(e) {
    this.props.clearErrors();
    this.setState({ country: e.target.value });
  }

  handleCityChange(e) {
    this.props.clearErrors();
    this.setState({
      city: e.target.value,
      cityValidationState: null,
      minTempValidationState: null,
      maxTempValidationState: null
    });
  }
  handleMinTempChange(e) {
    this.props.clearErrors();
    this.setState({
      minTemp: e.target.value,
      cityValidationState: null,
      minTempValidationState: null,
      maxTempValidationState: null
    });
  }
  handleMaxTempChange(e) {
    this.props.clearErrors();
    this.setState({
      maxTemp: e.target.value,
      cityValidationState: null,
      minTempValidationState: null,
      maxTempValidationState: null
    });
  }
  validateInputs() {
    let retVal = true;
    if (this.state.city === "") {
      this.setState({ cityValidationState: "error" });
      retVal = false;
    }
    if (this.state.minTemp === "") {
      this.setState({ minTempValidationState: "error" });
      retVal = false;
    }
    if (this.state.maxTemp === "") {
      this.setState({ maxTempValidationState: "error" });
      retVal = false;
    }
    if (this.state.maxTemp < this.state.minTemp) {
      this.setState({ minTempValidationState: "error" });
      this.setState({ maxTempValidationState: "error" });
      retVal = false;
    }
    return retVal;
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.clearErrors();
    if (this.validateInputs()) {
      this.props.fetchWeather({
        countryCode: this.state.country,
        cityName: this.state.city,
        minTemp: this.state.minTemp,
        maxTemp: this.state.maxTemp
      });
      this.setState({
        country: this.state.country,
        city: "",
        minTemp: "",
        maxTemp: ""
      });
    }
  }

  checkAndRenderError() {
    const errorStyle = { marginLeft: "1%", color: "red" };
    if (this.props.error && this.props.error.data === "Invalid Input") {
      return (
        <ErrorMsg
          message="Invalid input.Please check the data entered"
          errorStyle={errorStyle}
        />
      );
    }
  }
  render() {
    var formGroupSpacing = { marginLeft: "0.3%" };
    var buttonSpacing = { marginTop: "1.8%", marginLeft: "0.2%" };
    return (
      <div>
        <Form inline>
          <FormGroup style={formGroupSpacing} controlId="countrySelect">
            <div>
              <ControlLabel>Country</ControlLabel>
              <div>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  value={this.state.country}
                  onChange={this.handleCountryChange}
                >
                  {countryData.map(country => {
                    return (
                      <option key={country.Code} value={country.Code}>
                        {country.Name}
                      </option>
                    );
                  })}
                </FormControl>
              </div>
            </div>
          </FormGroup>
          <FormGroup
            style={formGroupSpacing}
            controlId="cityName"
            validationState={this.state.cityValidationState}
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
          </FormGroup>
          <FormGroup
            style={formGroupSpacing}
            controlId="minTemp"
            validationState={this.state.minTempValidationState}
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
          </FormGroup>
          <FormGroup
            style={formGroupSpacing}
            controlId="maxTemp"
            validationState={this.state.maxTempValidationState}
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

        {this.checkAndRenderError()}
      </div>
    );
  }
}
function mapStateToProps({ error }) {
  return { error };
}
export default connect(
  mapStateToProps,
  actions
)(CityInputForm);
