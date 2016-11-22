var React = require('react');
var d3 = require('d3');
var DataSeries= require('../components/DataSeries');
var Axis = require('../components/Axis');
var Legend = require('../components/LineChartLegend');
var _ = require('underscore');


var data1 =  {
  series1: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
  series2: [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
  series3: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
};

var data2 =  {
  series1: [ { x: 0, y: 2 }, { x: 1, y: 20 }, { x: 2, y: 11 }, { x: 3, y: 12 }, { x: 4, y: 18 }, { x: 5, y: 11 }, { x: 6, y: 1 } ],
  series2: [ { x: 0, y: 12 }, { x: 1, y: 15 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 7 }, { x: 5, y: 14 }, { x: 6, y: 9 } ],
  series3: [ { x: 0, y: 0 }, { x: 1, y: 7 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 9 }, { x: 5, y: 2 }, { x: 6, y: 1 } ]
};


//Can add series4 in data2 to test entering and exiting a new component
// series4: [ { x: 0, y: 7 }, { x: 1, y: 3 }, { x: 2, y: 6 }, { x: 3, y: 3 }, { x: 4, y: 6 }, { x: 5, y: 2 }, { x: 6, y: 0 } ]

//SVG component
var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        {this.props.children}
      </svg>
    );
  }
});

var ChartContainer = React.createClass({
  getDefaultProps: function() {
   return {
     width: 700,
     height: 500
   }
  },
  getInitialState: function () {
    //set up initial viewable keys so all paths are visible
    viewableKeysArray = [];
    Object.keys(data1).map(function(key){
      viewableKeysArray.push(key);
    });
    return {
      data: data1,
      colors: ["blue", "orange", "green", "red"],
      viewableKeys: viewableKeysArray,
      v: 1
    }
  },
  handleClick: function(){
    var change = this.state.data === data1 ? data2: data1;
    this.setState({data: change})
    this.setState({v: this.state.v===0 ? 1 : 0});
  },
  //toggle path visibility on legend click
  toggleVisibility: function (i) {
    var newKeys = [];
    Object.keys(this.state.data).map(function(key){
      newKeys.push(key);
    });
    var currentKeys = this.state.viewableKeys;
    if (currentKeys.includes(newKeys[i])) {
      currentKeys.splice(currentKeys.indexOf(newKeys[i]), 1)
    } else {
      currentKeys.push(newKeys[i])
    }
    this.setState({viewableKeys: currentKeys});
  },
  componentWillMount: function () {
    //Console log radio station data
    var dataset= {};
    var keys = [];
    d3.csv("https://gist.githubusercontent.com/stephr3/846b6cb5a3ba464d8ec2eee56be21c98/raw/1776b769dbade3d250bbd5896033566af7ee4747/web_traffic_sample.csv", function(data) {
    data.map(function(d) {
      keys.push(d.Station);
    });
    uniqueKeys = new Set(keys);
    uniqueKeysArray = Array.from(uniqueKeys);
    uniqueKeysArray.map(function(key){
      dataset[key] = [];
    });
    uniqueKeysArray.map(function(key){
      data.map(function(d){
        if (d.Station === key) {
          dataset[key].push({x: d.Month, y: d.Pageviews});
        }
      })
    })
    console.log(dataset);
    })
  },
  render: function(){
    var size = { width: this.props.width, height: this.props.height };
    var dataSeries = this.state.data;
    var viewableKeys= this.state.viewableKeys;
    var colors= this.state.colors;
    var height = this.props.height;
    var v = this.state.v;
    //flatten all object values
    var allValues = [];
    Object.keys(dataSeries).map(function(key){
      allValues = allValues.concat(dataSeries[key]);
    });
    //find yMax
    var max = _.chain(allValues)
               .zip()
               .map(function(values) {
                 return _.reduce(values, function(memo, value) { return Math.max(memo, value.y); }, 0 );
               })
               .max()
               .value();

  var margin = {top: 20, right: 50, bottom: 20, left: 50},
       w = this.props.width - (margin.left + margin.right),
       h = this.props.height - (margin.top + margin.bottom);

   var xScale = d3.scaleLinear()
     .domain([0, 6])
     .range([0, (this.props.width - margin.right) * .8]);

   var yScale = d3.scaleLinear()
     .domain([0, max])
     .range([(this.props.height - 50) * .8, 0]);

   var yAxis = d3.axisLeft()
       .scale(yScale)
       .ticks(5);

   var xAxis = d3.axisBottom()
       .scale(xScale)
       .ticks(7);

    return(
      <div>
        <Chart width={this.props.width} height={this.props.height}>
          <g transform='translate(0, 50)'>
          //Maps through the data and returns a DataSeries component for each line.
            {Object.keys(dataSeries).map(function(key,index){
              return  (<g key={`dataseries-${index}`}>
                      {viewableKeys.includes(key) ?
                          <DataSeries
                            data={dataSeries[key]}
                            xScale ={xScale}
                            yScale = {yScale}
                            ref = {key}
                            height={height}
                            color={colors[index]}
                            v = {v}
                            />
                            : null
                          }
                        </g>)
                })
            }
            <Legend data={dataSeries} onClick={this.toggleVisibility} />
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x"/>
          </g>
        </Chart>
        <button onClick={this.handleClick} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Toggle Data
        </button>
      </div>
    );
  }
});

module.exports = ChartContainer;
