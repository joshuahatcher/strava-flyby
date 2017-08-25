import constants from './constants';

const pace = {
  getObject: (params) => {
    const pace = (params.moving_time / 60) / (params.distance / 1609.34);

    return {
      pace,
      pace_legible: getLegiblePace(pace)
    };
  },

  getAll: (activityMap) => {
    let paceMap = {};

    for (let athlete in activityMap) {
      let activities = activityMap[athlete];

      paceMap[athlete] = getAveragePace(activities);
    }

    return paceMap;
  },

  findClosest: (base, candidates) => {
    return Object.keys(candidates).reduce((closePaces, key) => {
      let candidate = candidates[key];
      let friend = constants.friends[key];

      // User's own pace will be included, but user will not be in their own friends.
      if (friend && (Math.abs(candidate.pace - base.pace) * 60) <= 15) {
        closePaces.push({
          name: `${friend.firstname} ${friend.lastname}`,
          imgUrl: friend.profile_medium,
          pace: candidate.pace_legible
        });
      } 

      return closePaces;
    }, []);
  }
}

function getLegiblePace(pace) {
  const minutes = Math.floor(pace);
  let seconds = Math.round(60 * (pace - minutes));

  seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

  return `${minutes}:${seconds}`;
}

function getAveragePace(activities) {
  const paceParams = activities.reduce((totals, activity) => {
    totals.distance += activity.distance;
    totals.moving_time += activity.moving_time;

    return totals;
  }, { distance: 0, moving_time: 0 });

  return pace.getObject(paceParams);
}

export default pace;
