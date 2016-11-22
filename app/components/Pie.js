var React = require('react');
var d3 = require('d3');
var ReactMotion = require('react-motion');
var Motion = ReactMotion.Motion;
var spring = ReactMotion.spring;
var PieLegend = require('./PieLegend');

var Pie = React.createClass({
  render: function () {
    var pie = d3.pie().sort(null);
    var legendX = this.props.x * 1.5;
    var legendY = this.props.y / 2;
    var colorScale  = ["blue", "orange", "green", "red", "purple", "brown", "pink", "gray"];
    var arc = d3.arc()
      .innerRadius(this.props.innerRadius)
      .outerRadius(this.props.outerRadius);
    return (
      <g transform={`translate(${this.props.x}, ${this.props.y})`}>
        {pie(this.props.data).map((slice, i) =>
          <Motion
            key={i}
            defaultStyle={{
              startAngle: slice.startAngle,
              endAngle: slice.endAngle,
              padAngle: slice.padAngle
            }}
            style={{
              startAngle: spring(slice.startAngle),
              endAngle: spring(slice.endAngle),
              padAngle: spring(slice.padAngle)
            }}>
              {value => <path
                fill={colorScale[i]}
                d={arc(value)}
                />}
          </Motion>
        )}
        <PieLegend data={this.props.data}/>
      </g>
    );
  }
});

module.exports = Pie;
