import React from 'react';

// Components
import Background from '../background';
import Loader from '../loader';
import SearchPanel from '../search-panel';
import ResultsPanel from '../results-panel';

// Services
import { getFriends, getSelf, getUser } from '../../services/api';
import constants from '../../services/constants';
import { getObject } from '../../services/pace';

// Styles
import './style.less';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
    this.setLoading = this.setLoading.bind(this);
    this.setResults = this.setResults.bind(this); // TODO: Add a router to manage view updates.
  }

  setLoading(results) {
    if (results) {
      this.setResults(results);
    }

    this.setState({ loading: !this.state.loading });
  }

  setResults(results) {
    this.results = results;
  }

  componentDidMount() {
    let promises = [
      getFriends(),
      getSelf()
    ];

    Promise.all(promises).then((responses) => {
      const friends = responses[0];

      this.friends = constants.friends = responses[0];
      this.user = responses[1];

      getUser(this.user.id).then(response => {
        this.user.pace = getObject(response.recent_run_totals);
        constants.user = this.user;

        this.setState({ loading: false });
      })
    });
  }

  render() {
    let loading = this.state.loading;
    let results = this.results;
    return (
      <div>
        { loading ? (<Loader />) : (
        <div>
          { results ?
            <ResultsPanel results={this.results} setLoading={this.setLoading} /> :
            <SearchPanel user={this.user} setLoading={this.setLoading} />
          }
          <Background friends={this.friends} />
        </div>) }
      </div>
    )
  }
}
