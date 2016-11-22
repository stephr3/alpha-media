var React = require('react');
var ReactMotion = require('react-motion');
var Motion = ReactMotion.Motion;
var spring = ReactMotion.spring;
var ToolTip = require('./ToolTip');

var Circle = React.createClass({
  getInitialState: function () {
    return  {
      hover: false
    }
  },
  showToolTip: function (index) {
    this.setState({ hover: true })
  },
  hideToolTip: function () {
    this.setState({ hover: false })
  },
  render: function () {
    var self=this;
    return(
        <g>
          <Motion
            defaultStyle={
              {
                cx:this.props.cx,
                cy:this.props.height - 50
              }
            }
            style={
              {
                cx:this.props.cx,
                cy:spring(this.props.cy)
              }
            }
            >
          {v =>
            <circle
              cx={v.cx}
              cy={v.cy}
              r={this.state.hover ? 8 : 6}
              key={"circle-" + this.props.index}
              onMouseOver={this.showToolTip}
              onMouseOut={this.hideToolTip}
              />
          }
          </Motion>
          <ToolTip
            x={this.props.cx + 7}
            y={this.props.cy - 3}
            style={this.state.hover ? {display:'block'} : {display:'none'}}
            innerText={this.props.data[this.props.index].y}
          />
      </g>
    )
  }
})

module.exports = Circle;
