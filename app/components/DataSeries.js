var React = require('react');
var d3 = require('d3');
var Line = require("./Line");
var ToolTip = require("./ToolTip");
var Circle = require("./Circle");

var DataSeries = React.createClass({
  renderCircles: function () {
    return (coords, index) => {
      return (
        <g key={"circle-group" + index}>
          <Circle
            cx={this.props.xScale(coords.x)}
            cy={this.props.yScale(coords.y)}
            height={this.props.height}
            index={index}
            data={this.props.data}
          />
        </g>
      )
    }
  },
  render: function() {
    return (
      <g transform="translate(20,10)">
        <Line data={this.props.data}
          color={this.props.color}
          xScale={this.props.xScale}
          yScale={this.props.yScale}
          v={this.props.v}
        />
        {this.props.data.map(this.renderCircles(this.props))}
      </g>
    )
  }
});

module.exports = DataSeries;
