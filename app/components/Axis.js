var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
//component that creates the axis.
var Axis=React.createClass({
  componentDidUpdate: function () { this.renderAxis(); },
  componentDidMount: function () { this.renderAxis(); },
  renderAxis: function () {
      var node = ReactDOM.findDOMNode(this);
      d3.select(node).call(this.props.axis);
  },
  render: function () {
      var translateX = "translate(20,"+(this.props.h) * .8 +")";
      var translateY= "translate(20,10)";
      return (
          <g
            className="axis"
            transform={this.props.axisType=='x'?translateX:translateY}
          >
          </g>
      );
  }
});

module.exports = Axis;
