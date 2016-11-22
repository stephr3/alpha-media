var React = require('react');

var TextInput = React.createClass({
  render: function(){
    return (
      <input onChange={this.props.onChange} value={this.props.displayText}></input>
    )
  }
});

module.exports= TextInput;
