import React from 'react';

// Components
import Header from '../header';
import Profile from '../profile';

// Services
import api from '../../services/api';
import pace from '../../services/pace';

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

export default class SearchPanel extends React.Component {
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

    api.getActivities(this.searchParam)
      .then(activities => {
        // Since Strava's API won't return the activities of a single athlete who is not the user,
        // we must get them indirectly by getting all recent activities and sorting by user.
        const runs = activities.filter(activity => activity.type === 'Run');
        const activitiesMap = sortActivitiesByAthlete(runs);
        const paceMap = pace.getAllPaces(activitiesMap);

        console.log(paceMap);

        me.props.setLoading();
      });
  }

  render() {
    return (
      <div className="main-cover cover in-front flex center-children">
        <div className="block center-children">
          <Header title="FlyBy" />
          <Profile athlete={this.props.user} />
          <p className="strong">FlyBy is a tool to help runners using Strava to find appropriate running buddies based on pace.</p>
          <p className="strong">Please choose where you would like to search from:
            &nbsp;
            <select onChange={this.setSearchParam}>
              <option value="following">From people I follow</option>
              <option value="clubs">From people in my clubs</option>
            </select>
          </p>
          <button className="submit" onClick={this.getRunningBuddies}>Go</button>
        </div>
      </div>
    )
  }
}
