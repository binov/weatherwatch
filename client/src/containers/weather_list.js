import React, { Component } from "react";
import { connect } from "react-redux";
import RechartRenderer from "../components/recharts_renderer";
import * as actions from "../actions";
import GoogleMap from "../components/google_map";
import "./weather_list.css";
import uuid from "uuid/v1";
class WeatherList extends Component {
  componentDidMount() {
    this.props.fetchWeatherAll();
  }

  renderWeather() {
    if (this.props.weather.length > 0) {
      return this.props.weather.map((cityData, index) => {
        const { tempData, minRef, maxRef, lat, lon } = cityData;
        return (
          <tr key={uuid()}>
            <td>
              <GoogleMap lon={lon} lat={lat} />
            </td>
            <td>
              <RechartRenderer
                data={tempData}
                minRef={minRef}
                maxRef={maxRef}
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
