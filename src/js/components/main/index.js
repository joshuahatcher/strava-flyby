import React from 'react';

// Compontents
import Background from '../background';
import Header from '../header';
import Loader from '../loader';

// Services
import api from '../../services/api';
import constants from '../../services/constants';

// Styles
import './style.less';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const me = this;

    api.get('https://www.strava.com/api/v3/athlete/friends', { per_page: 200 })
      .then(friends => {
        me.friends = constants.friends = friends;

        me.setState({ loading: false });
      });
  }

  render() {
    let loading = this.state.loading;
    return (
      <div>
        { loading ? (<Loader />) : (<div>
          <div className="main-cover cover in-front flex center-children">
            <div className="block center-children">
              <Header title="FlyBy" />
              <p className="strong">FlyBy is a tool to help runners using Strava to find appropriate running buddies based on pace.</p>
              <p className="strong">Please choose where you would like to search from:
                &nbsp;
                <select>
                  <option>From people in my clubs</option>
                  <option>From people I follow</option>
                </select>
              </p>
              <button className="submit">Go</button>
            </div>
          </div>
          <Background friends={this.friends} />
        </div>) }
      </div>
    )
  }
}