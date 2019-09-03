import React, { Component } from 'react';
import '../App.css';
import {getNews} from './api.js';
import LoadingIcon from '../LoadingIcon';
import NewsCard from './NewsCard';
import CardContainer from '../CardContainer';
import CardType from '../constants.js'

class NewsCardContainer extends Component {

    constructor(props) {
      super();
      
      this.state = {
        dataSource : [],
        isLoading : true,
      }
    }
  
    componentDidMount() {
      const outer = this;
      getNews((response) => {
        console.log(response);
        outer.setState({
          dataSource : response,
          isLoading : false,
        });
      });
    }
  
    render() {
      const cardType = CardType.NEWS;
  
      let body = <LoadingIcon color={cardType} />;

      if (this.state.isLoading == false) {
        body = this.state.dataSource.map(value => {
          return <NewsCard key={value.url} data={value} />
        });
      }
  
      return (
        <CardContainer cardTitle="News" cardBody={body} cardType={CardType.NEWS} />);
    }
  }

  export default NewsCardContainer;
