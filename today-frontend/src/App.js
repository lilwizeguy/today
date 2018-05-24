import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from 'react-pell';
import {Doughnut, Line, Bar} from 'react-chartjs-2'

import {getStocks, getWeather, getNews}  from './api'
const boldStyle = {
  fontWeight : "bold",
};

class StocksCard extends Component {

  constructor(props) {
    
    super();
    
    this.state = {
      dataSource : [],
      isLoading : true,
    };
  }

  fetchStocks() {
    const outer = this;
    getStocks((response) => {
      console.log(response);
      outer.setState({
        dataSource : response,
        isLoading : false,
      })
    })
  }

  componentWillMount() {
   // this.fetchStocks();

    const outerState = this;
    fetch(this.props.dataUrl).then((response)=> {
      return response.json();
    }).then((parsedJson)=> {
      parsedJson = parsedJson.data;

      console.log("Parsed json");
      console.log(parsedJson);

      const timeData = parsedJson.timeseries.map((val)=> {

        return parseFloat(val["price"]);
      });

      console.log(timeData);

      outerState.setState({
        timeseries : timeData,
        symbol : parsedJson.symbol,
        price : parsedJson.price,
        isLoading : false,
      });
    });

  }

  render() {

    if (this.state.isLoading) {
      return <h3>Stocks Loading...</h3>
    }

    console.log("Rendeinr")
    console.log(this.state.timeseries)


    const tmpLabels = [];

    const shaveLength = 20;
    for (let i = 0; i < shaveLength; i++) {
      tmpLabels.push("");
    }

    const chartData = {
      labels: tmpLabels,
      datasets: [
        {
       //   label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          data : this.state.timeseries.slice(0, shaveLength),
         // data : this.state.timeseries.slice(0, 10),
        // data : [65, 100, 80, 81, 56, 55, 40],
        },
      ],
    };

    // const chartData = {
    //   datasets: [
    //     {
    //       label: 'My First dataset',
    //       fill: false,
    //       lineTension: 0.1,
    //       backgroundColor: 'rgba(75,192,192,0.4)',
    //       borderColor: 'rgba(75,192,192,1)',
    //       borderCapStyle: 'butt',
    //       borderDash: [],
    //       borderDashOffset: 0.0,
    //       borderJoinStyle: 'miter',
    //       pointBorderColor: 'rgba(75,192,192,1)',
    //       pointBackgroundColor: '#fff',
    //       pointBorderWidth: 1,
    //       pointHoverRadius: 5,
    //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //       pointHoverBorderColor: 'rgba(220,220,220,1)',
    //       pointHoverBorderWidth: 2,
    //       pointRadius: 1,
    //       pointHitRadius: 10,
    //       data : this.state.timeseries.slice(0, 10),
    //      // data : [65, 59, 80, 81, 56, 55, 40],
    //     },
    //   ],
    // };

    const options = {
      legend: {
         display: false
         
      },
      scales : {
        yAxes: [{
          ticks: {
              beginAtZero:false,
              // min: 180,
              // max: 190    
          }
        }]
      },
      tooltips: {
         enabled: false
      },
      responsive:true,
      maintainAspectRatio: false,
    };

    const heightStyle = {
      height : "80pt",
    }

    const boldStyle = {
      fontWeight : 'bold',
    }


    // const stocks = this.state.dataSource.map(value => {
    //   return (<li class="collection-item" style={heightStyle}>
          
    //       <div class="col s12 m3">
    //         <h6 class="left-align">{value.symbol}</h6> 
    //         <h5 class="left-align" style={boldStyle}>{value.price}</h5>
    //       </div>
    //       <div class="col s12 m9">
    //         <Line  ref={value.symbol} data={chartData} options={options} height={80}/>
    //       </div>
    //   </li>);
    // });

    const symbol = this.state.symbol;
    const price = this.state.price;

    console.log(symbol);

    return (<li class="collection-item" style={heightStyle}>   
        <div class="col s12 m3">
          <h6 class="left-align">{symbol}</h6> 
          <h5 class="left-align" style={boldStyle}>{price}</h5>
        </div>
        <div class="col s12 m9">
          <Line ref={symbol} data={chartData} options={options} height={80}/>
        </div>
      </li>);

        // <div>
        //   <ul class="collection with-header z-depth-1">
        //       <li class="collection-header"><h4 class="left-align" style={boldStyle}>Stocks</h4></li>
        //       {stocks}

        //   </ul>
        // </div>



  }
}

class NotesCard extends Component {


  
  updateNotes(html) {
    localStorage.setItem("notes", html);
  }

  loadNotes() {
    const notes = localStorage.getItem("notes");

    if (!notes) {
      return "";
    }

    return notes;
  }



  render() {

    const boldStyle = {
      fontWeight : 'bold',
    }

    return (
        <div>
          <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h4 class="left-align" style={boldStyle}>Notes</h4></li>
            <li class="collection-item left-align">
              <Editor defaultContent={this.loadNotes()} onChange={this.updateNotes.bind(this)} />
            </li>
          </ul>
        </div>
    );
  }
}


class StocksCardContainer extends Component {
  
  constructor() {
    super();

    this.state = {
      dataSource : [],
    };

  }

  componentDidMount() {
    this.getStockUrls();
  }

  getStockUrls() {
    const stocks = ['AAPL', 'GOOG', 'FB'];

    const urls = stocks.map((val)=> {
      return 'http://localhost:5000/api/stocks/daily/' + val;
    });

    console.log(urls);

    this.setState({
      dataSource : urls
    });

  }


  render() {

    

    const stocks = this.state.dataSource.map((url) => {
        return <StocksCard dataUrl={url} />
    }); 

    console.log("The size of stocks is " + stocks.length);

    return (
      <div>
        <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h4 class="left-align" style={boldStyle}>Stocks</h4></li>
            {stocks}
        </ul>
      </div>
  );
  }

}

class WeatherCardContainer extends Component {

  render() {

    const boldStyle = {
      fontWeight : "bold",
    };
    
    return (
      <div>
        <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h4 class="left-align" style={boldStyle}>Weather</h4></li>
            <li class="collection-item">Temperature</li>
            <li class="collection-item">Air Pressure</li>
        </ul>
      </div>
    )
  }

}

class NewsCard extends Component {

  constructor(props) {
    
    super();
    
    this.state = {
      dataSource : [],
      isLoading : true,
    }
  }

  fetchNews() {
    const outer = this;
    getNews((response) => {
      console.log(response);
      outer.setState({
        dataSource : response,
        isLoading : false,
      })
    })
  }

  componentDidMount() {
    this.fetchNews();
  }

  render() {

    if (this.state.isLoading) {
      return <h3>Loading News...</h3>
    }


    const boldStyle = {
      fontWeight : "bold",
    };

    const stories = this.state.dataSource.map(value => {
        return <li class="collection-item left-align">
                <a style = {boldStyle} class="teal-text" href={value.url}>{value.title}</a>
                <p> <span style = {boldStyle} class="grey-text">{value.sourceName} - </span> {value.description}</p>
              </li>;
    });

    return (
      <div>
        <ul class="collection with-header z-depth-1">
          <li class="collection-header left-align"><h4 style={boldStyle}>News</h4></li>
          {stories}
        </ul>
      </div>
    );
  }
}

class Navbar extends Component {

  render() {
    return (       <nav class="grey lighten-4">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo teal-text">Today</a>   
    </div>
  </nav> 
);
  }
}

class App extends Component {
  render() {
    return (
        <div className="App grey lighten-5">

          <Navbar />

          <div class="row">  
            <div class="col s12 m5">      
              <StocksCardContainer />
              <WeatherCardContainer />       
              <NotesCard />

            </div>
            <div class="col s12 m7">
            <NewsCard />
            </div>
          </div>
        
        </div>

    );
  }
}

export default App;
