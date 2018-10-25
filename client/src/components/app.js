import React, { Component } from "react";
import Header from "../components/header";
import CityInputForm from "../containers/city_input_form";
import WeatherList from "../containers/weather_list";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ paddingTop: "65px" }}>
          <CityInputForm />
          <WeatherList />
        </div>
      </div>
    );
  }
}
