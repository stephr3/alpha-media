var React = require('react');

var ToolTip = React.createClass({
  render: function() {
    return (
      <text
        x={this.props.x}
        y={this.props.y}
        style={this.props.style}
      >
        {this.props.innerText}
      </text>
    )
  }
});

module.exports = ToolTip;
