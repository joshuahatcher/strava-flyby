import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Components
import Background from '../background';
import Loader from '../loader';
import SearchPanel from '../search-panel';
import ResultsPanel from '../results-panel';
import NotFound from '../not-found';

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
      const friends = Object.keys(responses[0])
        .reduce((friendsObj, key) => {
          let friend = responses[0][key];
          // If profile photo is unset, API sends a broken link
          friend.profile_medium = friend.profile_medium  === 'avatar/athlete/medium.png' ?
            constants.genericProfilePhotoUrl :
            friend.profile_medium;

          friendsObj[key] = friend;

          return friendsObj;
        }, {});

      this.friends = constants.friends = friends;
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
          <BrowserRouter>
            <Switch>
              <Route exact path='/' render={(props) => (
                <SearchPanel user={this.user} setLoading={this.setLoading} />
              )} />
              <Route exact path='/results' render={(props) => (
                <ResultsPanel results={this.results} />
              )} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
          <Background friends={this.friends} />
        </div>) }
      </div>
    )
  }
}
