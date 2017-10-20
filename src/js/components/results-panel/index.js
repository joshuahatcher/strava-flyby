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

    if (!props.results) {
      document.location = '/';
    }
  }

  listResults(results) {
    return results.map((result, index) => <Profile key={index} athlete={result} />);
  }

  render() {
    return (
      <div className="main-cover cover in-front flex center-children column">
        <h2>{this.props.results.length} Runners Found</h2>
        <div className="results content-box flex flex-wrap">
          { this.listResults(this.props.results) }
        </div>
        <Link to='/' className="submit">Back</Link>
      </div>
    )
  }
}