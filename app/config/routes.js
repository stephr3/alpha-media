//react-router is used to create to create declaritive routes using jsx. Components can be renderend in specific URl's
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory; //hashHistory manages routing history with the hash portion of the url.
var Nav = require('../components/Nav');
var Home = require('../components/Home');
var LetterContainer = require('../containers/LetterContainer');
var ChartContainer = require('../containers/ChartContainer');
var RechartContainer = require('../containers/RechartContainer');
var PiechartContainer = require('../containers/PiechartContainer');
var PieChartSample= require('../containers/PieChartSample')

var routes = (
  //routes are created in JSX format.
    <Router history={hashHistory}>
        <Route path='/' component={Nav}>//Nav component is always active, and displayed on each page.
            <IndexRoute component={Home} />
            <Route path='letters' header='Letter Animation' component={LetterContainer} />
            <Route path='line-chart' header='Line Chart' component={ChartContainer} />
            <Route path='rechart' header='Rechart' component={RechartContainer} />
            <Route path='piechart' header='Pie Chart' component={PiechartContainer} />
            <Route path='piereact' header='pie' component={PieChartSample}/>
        </Route>
    </Router>
);

module.exports = routes;
