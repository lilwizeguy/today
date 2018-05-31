import React, { Component } from 'react';
import '../App.css';


class ErrorCard extends Component {


    render() {

        const {message, onTryAgain, color} = this.props;

        const fullClassName = "waves-effect waves-light btn "+color;
        return (<li className="collection-item">
                <p className="left-align">{message}</p>
                <a className={fullClassName} onClick={onTryAgain}>Try Again</a>
            </li>);
    }

}

export default ErrorCard;