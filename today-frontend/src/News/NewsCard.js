import React, { Component } from 'react';
import '../App.css';

class NewsCard extends Component {
    
    render() {

        const {url, title, sourceName, description} = this.props.data;

        return(<li key={url} className="collection-item left-align">
                  <a className="blue-text boldStyle" href={url}>{title}</a>
                  <p> <span className="grey-text boldStyle">{sourceName} - </span> {description}</p>
                </li>);
    }
}

export default NewsCard;