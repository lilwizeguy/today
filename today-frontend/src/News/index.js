import React, { Component } from 'react';
import '../App.css';
import {getNews} from './api.js';
import LoadingIcon from '../LoadingIcon';
import NewsCard from './NewsCard';


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
  
      let body = <LoadingIcon color="NEWS"/>;


      if (this.state.isLoading == false) {
        body = this.state.dataSource.map(value => {
          return <NewsCard key={value.url} data={value} />
        });
      }
  
      return (
        <div>
          <ul class="collection with-header z-depth-1">
            <li class="collection-header left-align"><h5 className="boldStyle">News</h5></li>
            {body}
          </ul>
        </div>
      );
    }
  }

  export default NewsCardContainer;
