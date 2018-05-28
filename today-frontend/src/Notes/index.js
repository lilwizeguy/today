import React, { Component } from 'react';
import '../App.css';
import Editor from 'react-pell';

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
          <div>
            <ul class="collection with-header z-depth-1">
              <li class="collection-header"><h5 class="left-align boldStyle">Notes</h5></li>
              <li class="collection-item left-align">
                <Editor defaultContent={this.loadNotes()} onChange={this.updateNotes.bind(this)} />
              </li>
            </ul>
          </div>
      );
    }
  }

  export default NotesCard;