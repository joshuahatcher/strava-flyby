import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from '../header';
import Profile from '../profile';

// Styles
import './style.less';

export default class ResultsPanel extends Component {
  constructor(props) {
    super(props);
    
    this.returnToSearch = this.returnToSearch.bind(this);
  }

  listResults(results) {
    return results.map((result, index) => <Profile key={index} athlete={result} />);
  }

  returnToSearch() {
    // TODO: Add a router to manage view updates
    console.log('Not done yet...');
  }

  render() {
    return (
      <div className="main-cover cover in-front flex center-children column">
        <h2>{this.props.results.length} Runners Found</h2>
        <div className="results block center-children">
          { this.listResults(this.props.results) }
        </div>
        <Link to='/' className="submit">Back</Link>
      </div>
    )
  }
}