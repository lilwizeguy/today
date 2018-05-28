import React, { Component } from 'react';

class LoadingIcon extends Component {



    colorForKeyword() {
      const key = this.props.color;

      let color = 'teal';
      switch(key) {
        case "STOCKS" :
          color = 'black';
          break;
        case "WEATHER" :
          color = 'orange';
          break;
        case "NEWS" :
          color = 'blue';
          break;
      }

      return color;
    }


    constructor() {
      super();
      this.state = {
        color : 'teal',
      }
    }

    componentDidMount() {
      this.setState({
        color : this.colorForKeyword(),
      })
    }


    render() {

      const inline = {
        backgroundColor : 'lightGray',
      }

      const decorator = 'indeterminate ' + this.state.color;
      return (
        // <div class="preloader-wrapper big active">
        //   <div class="spinner-layer spinner-blue-only">
        //     <div class="circle-clipper left">
        //       <div class="circle"></div>
        //     </div><div class="gap-patch">
        //       <div class="circle"></div>
        //     </div><div class="circle-clipper right">
        //       <div class="circle"></div>
        //     </div>
        //   </div>
        // </div>


        <div className="progress" style={inline}>
          <div className={decorator} ></div>
        </div>
      )
    }
  }

  export default LoadingIcon;
  