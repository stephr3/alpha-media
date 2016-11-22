var React = require('react');
var d3 = require('d3');
var ReactTransitionGroup = require("react-addons-transition-group");
var Letter = require('./letter');

var TextDisplay = React.createClass({
  render: function() {
    var self = this;
    var newColor = this.props.color;
    var newSize = this.props.size;
    var style = {
      color: newColor,
      fontSize: newSize
    };
    var transform = `translate(0, 20)`;
    var transition = d3.transition().duration(2000).ease(d3.easeCubicInOut);
    var arr = function () {
      return self.props.displayText.split('');
    };
    return (
      <g transform={transform}>
          <ReactTransitionGroup component="g">
              {this.props.displayText.split('').map((d, i) => (
                  <Letter
                    d={d}
                    i={i}
                    key={`letter-${d}-${i}`}
                    color={newColor}
                    transition={transition}
                    size={newSize}
                  />
               ))}
          </ReactTransitionGroup>
      </g>
      )
    }
});


module.exports= TextDisplay;
