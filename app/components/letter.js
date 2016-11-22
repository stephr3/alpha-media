var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');

var Letter = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: -60,
      className: 'enter',
      fillOpacity: 1e-6,
      color: this.props.color
    }
  },
  componentWillEnter: function (callback) {
    var self = this;
    var node = d3.select(ReactDOM.findDOMNode(self));
    this.setState({x: this.props.i * parseInt(this.props.size)/2});
    node.transition(this.props.transition).attr('y', 20)
        .style('fill-opacity', 1)
        .style('fill', this.state.color)
        .on('end', function () {
          self.setState({y: 20, fillOpacity: 1});
          callback()
        });
  },
  componentWillLeave: function (callback) {
    var self = this;
    var node = d3.select(ReactDOM.findDOMNode(self));
    this.setState({className: 'exit'});
    node.interrupt().transition(this.props.transition)
        .attr('y', 60)
        .style('fill-opacity', 1e-6)
        .style('fill', this.state.color)
        .on('end', function () {
          self.setState({y: 60, fillOpacity: 1e-6});
          callback()
        });
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({x: nextProps.i * parseInt(nextProps.size)/2});
  },
  render: function () {
    return (
        <text dy=".35em"
              y={this.state.y}
              x={this.state.x}
              className={this.state.className}
              style={{color: this.props.color, fontSize: this.props.size}}
        >
            {this.props.d}
        </text>
    );
  }
});

module.exports = Letter;
