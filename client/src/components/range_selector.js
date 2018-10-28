import React, { Component } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import "./forcast_info.css";
export default class RangeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { min: 0, max: 100 }
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.stepSize = 100 / this.props.num_days;
  }
  onValueChange(values) {
    values = values.map(value => value / this.stepSize);
    this.props.onRangeChange(values);
  }

  render() {
    return (
      <div className="range-selector">
        <Range
          dots
          step={this.stepSize}
          defaultValue={[0, 100]}
          onChange={this.onValueChange}
        />
      </div>
    );
  }
}
