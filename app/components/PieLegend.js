var React = require('react');

var PieLegend = React.createClass({
  renderKey: function (value, i) {
    var colorScale  = ["blue", "orange", "green", "red", "purple", "brown", "pink", "gray"];

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
        >
          {value}
        </text>
      </g>
    )
  },
  render: function () {
    return (
      <g transform={"translate(200,-200)"}>
        <text>Legend</text>
        {(this.props.data).map(this.renderKey)}
      </g>
    )
  }
});

module.exports = PieLegend;
