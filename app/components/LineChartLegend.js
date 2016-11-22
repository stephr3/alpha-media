var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var LineChartLegend = React.createClass({
  renderKey: function (value, i) {
    var colorScale  = ["blue", "orange", "green", "red"];

    return (
      <g key={`legend-g-${i}`}>
        <rect 
          transform={`translate(0, ${20 + (i * 50)})`}
          fill={colorScale[i]}
          height="20px"
          width="20px"
          key={`legend-${i}`}
        />
        <text
          transform={`translate(40, ${35 + (i * 50)})`}
          key={`legend-text-${i}`}
          onClick={this.props.onClick.bind(null, i)}
          style={{cursor: 'pointer'}}
        >
        {value}
        </text>
      </g>
    )
  },
  render: function () {
    return (
      <g transform={"translate(550,20)"}>
      <text>Legend</text>
      {(Object.keys(this.props.data)).map(this.renderKey)}
      </g>
    )
  }
});

module.exports = LineChartLegend;
