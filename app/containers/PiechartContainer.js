var React = require('react');
var Pie = require('../components/Pie');

var data1 = [5, 2, 7, 1, 1, 3, 4, 9];
var data2 = [7, 3, 6, 2, 1, 5, 4, 10];

var PiechartContainer = React.createClass({
  getInitialState: function () {
    return {
      data: data1
    }
  },
  handleClick: function(){
    var change = this.state.data === data1 ? data2: data1;
    this.setState({data: change})
  },
  render: function () {
    var width = 500;
    var height = 500;
    var minViewportSize = Math.min(width, height);
    var radius = (minViewportSize * .7) / 2;
    var x = width / 2.7;
    var y = height / 2;

    return (
      <div>
        <svg width="500px" height="500px">
          <Pie
            x={x}
            y={y}
            outerRadius={radius} innerRadius={radius * .35}
            data={this.state.data}
            />
        </svg>
        <button
          onClick={this.handleClick}
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        >
          Toggle Data
        </button>
      </div>
    );
  }
});

module.exports = PiechartContainer;
