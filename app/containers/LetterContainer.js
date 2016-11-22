var React = require('react');
var TextInput = require('../components/TextInput');
var ButtonControls = require('../components/ButtonControls');
var SizeControls = require('../components/SizeControls');
var TextDisplay = require('../components/TextDisplay');

var LetterContainer = React.createClass({
  getInitialState: function () {
    return {
      color: 'black',
      displayText: '',
      size: '16px',
      opacity: '0'
    }
  },
  handleInputChange: function(event){
    this.setState({displayText: event.target.value});
  },
  handleSelectChange: function (event) {
    this.setState({size: event.target.value + 'px'});
  },
  handleClick: function (event) {
    this.setState({color: event.target.className});
  },
  render: function () {
    return (
    <div id="letter">
      <TextInput
        onChange={this.handleInputChange}
        displayText={this.state.displayText}
      />
      <ButtonControls
        onClick={this.handleClick}
        color={this.state.color}
        colortoggle={this.state.colortoggle}
      />
      <SizeControls onChange={this.handleSelectChange} />
      <svg width='100%'>
        <TextDisplay
          color={this.state.color}
          displayText={this.state.displayText}
          size={this.state.size}
        />
      </svg>
    </div>
    )
  }
});

module.exports = LetterContainer;
