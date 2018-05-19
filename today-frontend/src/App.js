import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from 'react-pell';
import {Doughnut, Line} from 'react-chartjs-2'

import {getStocks, getWeather, getNews}  from './api'

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
    this.fetchStocks();
  }

  render() {

    if (this.state.isLoading) {
      return <h3>Stocks Loading...</h3>
    }



    const chartData = {
      datasets: [
        {
          // label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
        }
      ],
    };

    const options = {
      legend: {
         display: false
         
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

    const stocks = this.state.dataSource.map(value => {
      return (<li class="collection-item" style={heightStyle}>
          
          <div class="col s12 m3">
            <h5>{value.symbol}</h5> 
            <p>{value.price}</p>
          </div>
          <div class="col s12 m9">
            <Line  ref={value.symbol} data={chartData} options={options} height={80}/>
          </div>
      </li>);
    });

    return (
      <div class="row">
        <div class="col s12 m3"></div>
        <div class="col s12 m6 ">
        <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h4>Stocks</h4></li>
            {stocks}

        </ul>
        </div>
        <div class="col s12 m3"></div>
      </div>
    );
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
    return (
      <div class="row">
        <div class="col s12 m3"></div>
        <div class="col s12 m6 ">
          <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h4>Notes</h4></li>
            <li class="collection-item left-align">
              <Editor defaultContent={this.loadNotes()} onChange={this.updateNotes.bind(this)} />
            </li>
          </ul>
        </div>
        <div class="col s12 m3"></div>
      </div>
    );
  }
}

class WeatherCard extends Component {

  render() {
    return (
      <div class="row">
        <div class="col s12 m3"></div>
        <div class="col s12 m6 ">
        <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h4>Weather</h4></li>
            <li class="collection-item">Temperature</li>
            <li class="collection-item">Air Pressure</li>

        </ul>
        </div>
        <div class="col s12 m3"></div>
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
                <a style = {boldStyle} class="blue-text" href={value.url}>{value.title}</a>
                <p> <span style = {boldStyle} class="grey-text">{value.sourceName} - </span> {value.description}</p>
              </li>;
    });

    return (
      <div class="row">
        <div class="col s12 m3"></div>
        <div class="col s12 m6 ">
        <ul class="collection with-header z-depth-1">
          <li class="collection-header left-align"><h4 style={boldStyle}>News</h4></li>
          {stories}
        </ul>
        </div>
        <div class="col s12 m3"></div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div className="App grey lighten-5">
          <NotesCard />
          <StocksCard />
          <WeatherCard />
          <NewsCard />
        </div>
      </div>
    );
  }
}

export default App;
