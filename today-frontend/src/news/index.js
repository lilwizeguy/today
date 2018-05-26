import React, { Component } from 'react';
import '../App.css';
import {getNews} from '../api.js'
import LoadingIcon from '../LoadingIcon'

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
        
        return (<li className="collection-item heightStyle"> 
        <LoadingIcon />
        </li>);
      }
  
      const stories = this.state.dataSource.map(value => {
          return <li class="collection-item left-align">
                  <a className="teal-text boldStyle" href={value.url}>{value.title}</a>
                  <p> <span className="grey-text boldStyle">{value.sourceName} - </span> {value.description}</p>
                </li>;
      });
  
      return (
        <div>
          <ul class="collection with-header z-depth-1">
            <li class="collection-header left-align"><h5 className="boldStyle">News</h5></li>
            {stories}
          </ul>
        </div>
      );
    }
  }

  export default NewsCard;