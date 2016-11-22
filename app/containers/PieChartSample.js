var React = require('react');
var d3 = require('d3');
var ReactMotion = require('react-motion');
var Motion = ReactMotion.Motion;
var spring = ReactMotion.spring;

var data = [
  { apples: 53245, oranges:	200 },
  { apples: 28479, oranges:	200 },
  { apples: 19697, oranges:	200 },
  { apples: 24037, oranges:	200 },
  { apples: 40245, oranges:	200 }
];

var PieChartSample = React.createClass({
  getInitialState() {
    return {
    	dataset: 'apples'
    }
  },
  setDataset(e) {
  	this.setState({
    	dataset: e.target.value
    });
  },
  render: function() {
    var width = 640,
        height = 300,
        radius = Math.min(width, height) / 2;

   var colorScale  = ["blue", "orange", "green", "red", "purple", "brown", "pink", "gray"];

    var pie = d3.pie()
        .value(d => d[this.state.dataset])
        .sort(null);

    var arc = d3.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 20);

    var displayedData = pie(data);

    return <div>
        <form>
          <label>
            <input
              type="radio"
              name="dataset"
              value="apples"
              onChange={this.setDataset}
              checked={this.state.dataset == 'apples'}
             />
            Apples
          </label>
          <label>
            <input
              type="radio"
              name="dataset"
              value="oranges"
              onChange={this.setDataset}
              checked={this.state.dataset == 'oranges'}
            />
              Oranges
            </label>
        </form>
        <svg width={width} height={height}>
        	<g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
          	{displayedData.map((slice, i) =>
              <Motion
              	key={i}
              	defaultStyle={{
                	startAngle: slice.startAngle,
                	endAngle: slice.endAngle,
                	padAngle: slice.padAngle,
                }}
              	style={{
              	  startAngle: spring(slice.startAngle),
              	  endAngle: spring(slice.endAngle),
              	  padAngle: spring(slice.padAngle)
              	}}>{value => <path
              		fill={colorScale[i]}
              	  d={arc(value)} />
              	}</Motion>
            )}
          </g>
        </svg>
      </div>;
  }
});

module.exports = PieChartSample;
