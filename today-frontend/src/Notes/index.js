import React, { Component } from 'react';
import '../App.css';
import Editor from 'react-pell';
import CardContainer from '../CardContainer'
import CardType from '../constants';

class NotesEditor extends Component {

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
    <li class="collection-item left-align">
      <Editor defaultContent={this.loadNotes()} onChange={this.updateNotes.bind(this)} />
    </li>);
  }
}

class NotesCard extends Component {
  
    render() {
      const editor = (<NotesEditor />);
      
      return (
      <CardContainer cardTitle="Notes" cardBody ={editor} cardType={CardType.NOTES}/>
      );
    }
  }

  export default NotesCard;