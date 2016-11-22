var React = require('react');
var d3 = require('d3');
var ReactMotion = require('react-motion');
var Motion = ReactMotion.Motion;
var spring = ReactMotion.spring;

var Line= React.createClass({
  getDefaultProps: function(){
    return {
      path: '',
      color: 'blue',
      width: 2
    }
  },
  nextProps: {},
  prevProps: {},
  didUpdate: false,
  transformer: function (v) {
    if (this.didUpdate) {
      var springData = []
      var self = this;
      //compare previous props and next props and push into spring data
      this.prevProps.data.map( function(coords,i) {
        var currentY = coords.y;
        var nextY = self.nextProps.data[i].y;
        var currentYScale = self.prevProps.yScale(currentY);
        var nextYScale = self.nextProps.yScale(nextY);
        if (self.props.v === 1) {
          if (currentY < nextY) {
            springData.push({x: coords.x, y: currentY + (Math.abs(nextY - currentY))*v});
          } else if (currentY > nextY) {
            springData.push({x: coords.x, y: currentY - (Math.abs(nextY - currentY))*v});
          } else {
            springData.push({x: coords.x, y: currentY});
          }
        } else {
          //reverse algorithm to account for v moving from 0 to 1
          if (currentY < nextY) {
            springData.push({x: coords.x, y: nextY - (Math.abs(currentY - nextY))*v});
          } else if (currentY > nextY) {
            springData.push({x: coords.x, y: nextY + (Math.abs(currentY - nextY))*v});
          } else {
            springData.push({x: coords.x, y: nextY});
          }
        }
      });
      return springData;
    } else {
      //make line animate from bottom of chart on first render
      var springData = []
      this.props.data.map( function(coords,i) {
        springData.push({x: coords.x, y: coords.y - v*coords.y});
      });
      return springData
    }
  },
  componentWillMount: function () {
    this.v = 0;
  },
  componentWillUpdate: function (nextProps) {
    this.nextProps = nextProps;
    this.prevProps = this.props;
  },
  componentDidUpdate: function () {
    this.didUpdate = true;
  },
  render: function(){
    var xScale=this.props.xScale
    var yScale=this.props.yScale
    var path = d3.line()
        .x(function(d) {
          return xScale(d.x);})
        .y(function(d) {
          return yScale(d.y);})
    return(
      <g>
        <Motion defaultStyle={{v:1}} style={{v:spring(this.didUpdate ? this.props.v : 0)}}>
          {v =>
            <path
              d={path(this.transformer(v.v))}
              stroke={this.props.color}
              strokeWidth={this.props.width}
              fill="none"/>
          }
        </Motion>
      </g>
    );
  }
});

module.exports = Line;
