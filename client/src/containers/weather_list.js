import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import GoogleMap from "../components/google_map";
import "./weather_list.css";
import uuid from "uuid/v1";
import ForcastInfo from "../components/forcast_info";
class WeatherList extends Component {
  componentDidMount() {
    this.props.fetchWeatherAll();
  }

  renderWeather() {
    if (this.props.weather.length > 0) {
      return this.props.weather.map((cityData, index) => {
        const { tempData, minRef, maxRef, lat, lon, num_days } = cityData;

        return (
          <tr key={uuid()}>
            <td>
              <GoogleMap lon={lon} lat={lat} />
            </td>
            <td>
              <ForcastInfo
                tempData={tempData}
                minRef={minRef}
                maxRef={maxRef}
                num_days={num_days}
              />
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>FORCASTS</th>
          </tr>
        </thead>
        <tbody>{this.renderWeather()}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(
  mapStateToProps,
  actions
)(WeatherList);
