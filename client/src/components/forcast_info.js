import React, { Component } from "react";
import RechartRenderer from "./recharts_renderer";
import RangeSelector from "./range_selector";
import moment from "moment";
import _ from "lodash";

export default class ForcastInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempData: props.tempData
    };
    this.onRangeChange = this.onRangeChange.bind(this);
    this.dateArr = props.tempData.map(tempRecord => tempRecord.date_time);
  }

  onRangeChange(range) {
    console.log("Range changed ForcastInfo:" + range);
    // filter to the number of days required
    let formattedRequiredDates = _.uniqBy(this.dateArr, value =>
      moment(value).format("MMM Do")
    )
      .slice(range[0], range[1])
      .map(record => moment(record).format("MMM Do"));

    let requiredTempData = this.props.tempData.filter(tempRecord =>
      formattedRequiredDates.includes(
        moment(tempRecord.date_time).format("MMM Do")
      )
    );
    this.setState({ tempData: requiredTempData });
  }

  render() {
    return (
      <div>
        <RechartRenderer
          data={this.state.tempData}
          minRef={this.props.minRef}
          maxRef={this.props.maxRef}
        />

        <RangeSelector
          onRangeChange={this.onRangeChange}
          num_days={this.props.num_days}
        />
      </div>
    );
  }
}
