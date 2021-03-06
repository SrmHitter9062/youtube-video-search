// Works for extends React.Component
// import React from 'react';

// { Component } is some cool syntax sugar
import React, { Component } from "react";

// Functional component - because it is a function
// Their is also class components that can keep a record (store information)
// since its rendering
// const SearchBar = () => {
//  return <input />; // It needs React to turn this into React.createElement...
//};

// Give access to all React.Component functionalities
// Every component that is class based need a render method
class SearchBar extends Component {
  // or extends React.Component
  // When a state changes, it re-renders the component and its children
  // This is how you initiate states in a class based components/
  // constructor is a new ES6 term
  constructor(props) {
    super(props); // We are calling the React.Component constructor method

    this.state = { term: "" };
  }
  /**
   * recieves the Typed text and sets in state
   */
  captureText = () => {
    this.props.onSearchTermChange(this.state.term);
  }
  /**
   * Handling for enter key after typing text
   */
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.captureText();
    }
  }
  render() {
    // onChange is a prop (property)
    // another way to do it
    // return <input onChange={this.onInputChange.bind(this)} />;
    // const onInputChange = _.debounce((term) => { this.onInputChange(term) }, 300);
    return (
      <div className="row header-row">
        <div className="search-bar col-md-8 offset-md-2">

          <div className="input-group mb-3">
            <input type="text" className="form-control" value={this.state.term} 
              onChange={(e) => this.onInputChange(e.target.value)}
              onKeyDown={this._handleKeyDown}
              placeholder="Please search by keyword" aria-label="Search" aria-describedby="search"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" onClick={this.captureText} type="button">
                {/* <span class="glyphicon glyphicon-search"></span> */}
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    // Controlled component has its value set by state
    // Its value changes when the state changes
    // <input value={this.state.term} />

    // ES6 way
    // return <input onChange={(event) => console.log(event.target.value)} />;
    // if I have a single argument I can also do:
    // return <input onChange={event => console.log(event.target.value)} />;
  }
  // Event handler
  onInputChange(term) {
    this.setState({ term });
  }
}

// new instance by --> new SearchBar

// Any file that imports search_bar will get this
// class as return
export default SearchBar;
