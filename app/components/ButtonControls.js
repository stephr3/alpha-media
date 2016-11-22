var React = require('react');

var Buttons = React.createClass({
  getInitialState: function () {
    return {
      colortoggle: false
    }
  },
  selectButton: function () {
    this.setState({colortoggle: this.state.colortoggle ? false: true})
  },
  render: function () {
    var self = this;
    var onClick = function(event) {
      self.props.onClick(event);
      self.selectButton();
    };
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: this.props.className == this.props.color ? this.props.className: '' ,
          color: this.props.className == this.props.color ? 'white': 'black'
        }}
        className={this.props.className}
      >
        {this.props.innerText}
      </button>
    )
  }
});

var ButtonControls = React.createClass({
  render: function(){
    return (
      <div>
        <Buttons
          onClick={this.props.onClick}
          className="black" color={this.props.color}
          innerText="Black"
        />
        <Buttons
          onClick={this.props.onClick}
          className="blue" color={this.props.color}
          innerText="Blue"
        />
        <Buttons
          onClick={this.props.onClick}
          className="red" color={this.props.color}
          innerText="Red"
        />
      </div>
    )
  }
})

module.exports = ButtonControls;
