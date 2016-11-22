var React = require('react');

var SizeControls = React.createClass({
  render: function(){
    return (
      <select onChange={this.props.onChange}>
        <option value="16">16</option>
        <option value="30">30</option>
        <option value="60">60</option>
        <option value="100">100</option>
      </select>
    )
  }
});

module.exports = SizeControls;
