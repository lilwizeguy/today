import React, { Component } from 'react';
import '../App.css';
import StocksCard from './StocksCard';
import {getStockUrls} from './api';

class StocksCardContainer extends Component {

  constructor() {
    super();

    this.state = {
      dataSource : [],
    };
  }

  componentDidMount() {
    const urls = getStockUrls();

    this.setState({
      dataSource : urls,
    });
  }

  render() {

    const stocks = this.state.dataSource.map((url) => {
        return <StocksCard key={url} dataUrl={url} />
    }); 

    return (
      <div>
        <ul className="collection with-header z-depth-1">
            <li class="collection-header"><h5 class="left-align boldStyle">Stocks</h5></li>
            {stocks}
        </ul>
      </div>);
  }
}

export default StocksCardContainer;