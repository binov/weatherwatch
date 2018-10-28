import React, { Component } from "react";
import { connect } from "react-redux";
import WeatherList from "../containers/weather_list";
import ErrorMsg from "../components/error_msg";
class MainBody extends Component {
  checkAndRenderError() {
    let message, errorStyle;
    if (this.props.error) {
      switch (this.props.error.status) {
        case 500:
          message = "Unexpected Error.Please try again";
          errorStyle = { marginLeft: "40%", marginTop: "10%", color: "red" };
          break;
        case 204:
          message = "Enter city details to get started..";
          errorStyle = {
            marginLeft: "5%",
            marginTop: "10%",
            fontStyle: "italic",
            fontSize: "70px",
            color: "#4D4471"
          };
          break;
        default:
          break;
      }
    }
    return <ErrorMsg message={message} errorStyle={errorStyle} />;
  }
  render() {
    return (
      <div>
        <WeatherList />
        {this.checkAndRenderError()}
      </div>
    );
  }
}

const mapStateToProps = ({ error }) => {
  return { error };
};
export default connect(mapStateToProps)(MainBody);
