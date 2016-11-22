var React = require('react');
var Recharts = require('recharts')
var {LineChart, Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend} = Recharts;


var data1= [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

var data2= [
  {name: 'Page A', uv: 400, pv: 2700, amt: 2400},
    {name: 'Page B', uv: 2000, pv: 398, amt: 5000},
    {name: 'Page C', uv: 500, pv: 7800, amt: 1290},
    {name: 'Page D', uv: 1780, pv: 2908, amt: 1000},
    {name: 'Page E', uv: 1390, pv: 1000, amt: 7181},
    {name: 'Page F', uv: 3000, pv: 8800, amt: 1500},
    {name: 'Page G', uv: 2490, pv: 5300, amt: 8100},
];

var RechartContainer = React.createClass({
  getInitialState: function(){
    return{
      data: data2
    }
  },
  handleClick: function(){
    var change = this.state.data === data1 ? data2: data1;
    this.setState({data: change})
    console.log(this.state.data)

  },
  render: function(){
    return(
      <div id="rechart">
        <LineChart
          width={600}
          height={300}
          data={this.state.data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{r: 8}}
            animationEasing="linear"
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#82ca9d"
            animationEasing="linear"
          />
          <Line
            type="monotone"
            dataKey="amt"
            stroke="red"
            animationEasing="linear"
          />
        </LineChart>
        <button
          onClick={this.handleClick}
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        >
          Toggle Data
        </button>
      </div>
    );
  }
})
module.exports = RechartContainer;
