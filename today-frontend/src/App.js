import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from 'react-pell';

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

    const stocks = this.state.dataSource.map(value => {
      return <li class="collection-item">{value.symbol} {value.price}</li>;
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


  render() {
    return (
      <div class="row">
        <div class="col s12 m3"></div>
        <div class="col s12 m6 ">
          <ul class="collection with-header z-depth-1">
            <li class="collection-header"><h4>Notes</h4></li>
      {/* <Editor onChange={this.handleChange.bind(this)} /> */}
            <Editor />
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



    const stories = this.state.dataSource.map(value => {
        return <li class="collection-item left-align">
                <a href={value.url}>{value.title}</a>
                <p>{value.sourceName}</p>
                </li>;
    });

    return (
      <div class="row">
        <div class="col s12 m3"></div>
        <div class="col s12 m6 ">
        <ul class="collection with-header z-depth-1">
          <li class="collection-header"><h4>News</h4></li>
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
      <div className="App">

        <NotesCard />
        <StocksCard />
        <WeatherCard />
        <NewsCard />
      </div>
    );
  }
}

export default App;
