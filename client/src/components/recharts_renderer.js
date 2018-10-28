import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";
import moment from "moment";
import _ from "lodash";
import CustomDot from "./recharts_custom_dot";

export default class RechartRenderer extends Component {
  getTicks(data) {
    const uniqueData = _.uniqBy(data, value =>
      moment(value.date_time).format("MMM Do")
    );
    return uniqueData.map(record => record.date_time);
  }

  dateFormat(date) {
    return moment(date).format("MMM Do");
  }

  render() {
    let labelMax, labelMin;
    if (this.props.maxRef === this.props.minRef) {
      labelMax = "Reference";
      labelMin = "";
    } else {
      labelMax = "Max";
      labelMin = "Min";
    }
    return (
      <div className="box-field">
        <LineChart
          width={600}
          height={300}
          data={this.props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date_time"
            ticks={this.getTicks(this.props.data)}
            tickFormatter={this.dateFormat}
          />
          />
          <YAxis yAxisId="left" domain={["auto", "auto"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            dot={<CustomDot data={this.props.data} />}
          />
          <ReferenceLine
            y={this.props.maxRef}
            yAxisId="left"
            label={labelMax}
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={this.props.minRef}
            yAxisId="left"
            label={labelMin}
            stroke="red"
            strokeDasharray="3 3"
          />
        </LineChart>
      </div>
    );
  }
}
