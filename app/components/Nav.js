var React = require('react');
var ReactDOM = require('react-dom');

var Nav = React.createClass({
  getInitialState: function(){
    return {
      active: 0
    }
  },
  onChange(id) {
    var node = findDOMNode(this);
    var path = node.children[0].children[id].attributes.to.nodeValue;
    this.setState({active: id});
    hashHistory.push(path);
  },
  render: function () {
    return (
      <div>
        <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
          <div className="mdl-tabs__tab-bar">
            <a href="/" className="mdl-navigation__link">Home |</a>
            <a href="#/letters" className="mdl-navigation__link">&nbsp;Letters |</a>
            <a href="#/line-chart" className="mdl-navigation__link">&nbsp;Line Chart |</a>
            <a href="#/rechart" className="mdl-navigation__link">&nbsp;Rechart |</a>
            <a href="#/piechart" className="mdl-navigation__link">&nbsp;Pie Chart |</a>
            <a href="#/piereact" className="mdl-navigation__link">&nbsp;Sample Pie Chart</a>
          </div>
      </div>
      <div className="container" style={{margin:"30px auto", width: "80%"}}>
        {this.props.children}
      </div>
    </div>
    )
  }
});

module.exports = Nav;
