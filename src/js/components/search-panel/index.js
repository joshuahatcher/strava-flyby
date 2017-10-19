import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from '../header';
import Profile from '../profile';

// Services
import { getActivities } from '../../services/api';
import constants from '../../services/constants';
import { getAll, findClosest } from '../../services/pace';

function sortActivitiesByAthlete(activities) {
  return activities.reduce((activityGroups, activity) => {
    let athleteId = activity.athlete.id;
    if (activityGroups[athleteId]) {
      activityGroups[athleteId].push(activity);
    } else {
      activityGroups[athleteId] = [ activity ];
    }

    return activityGroups;
  }, {});
}

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);

    this.searchParam = 'following';
    this.setSearchParam = this.setSearchParam.bind(this);
    this.getRunningBuddies = this.getRunningBuddies.bind(this);
  }

  setSearchParam(e) {
    this.searchParam = e.target.value;
  }

  getRunningBuddies() {
    const me = this;
    this.props.setLoading();

    getActivities(this.searchParam)
      .then(activities => {
        // Since Strava's API won't return the activities of a single athlete who is not the user,
        // we must get them indirectly by getting all recent activities and sorting by user.
        const runs = activities.filter(activity => activity.type === 'Run');
        const activitiesMap = sortActivitiesByAthlete(runs);
        const paceMap = getAll(activitiesMap);

        const buddies = findClosest(constants.user.pace, paceMap);

        me.props.setLoading(buddies);
      });
  }

  render() {
    return (
      <div className="main-cover cover in-front flex center-children">
        <div className="full-width block center-children">
          <Header title="FlyBy" />
          <div className="content-box">
            <Profile athlete={this.props.user} />
            <p>FlyBy is a tool to help runners using Strava to find appropriate running buddies based on pace.</p>
            <p>Please choose where you would like to search from:
              &nbsp;
              <select onChange={this.setSearchParam}>
                <option value="following">From people I follow</option>
                <option value="clubs">From people in my clubs</option>
              </select>
            </p>
          </div>
          <Link to="/results" className="submit" onClick={this.getRunningBuddies}>Go</Link>
        </div>
      </div>
    )
  }
}
