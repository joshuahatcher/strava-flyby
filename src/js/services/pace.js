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
    return Object.keys(candidates).filter(key => {
      // Check if user's average pace is within 15 seconds of a candidate;
      // Must also check if candidate is among friends, because user themself is included among candidates
      return constants.friends[key] && (Math.abs(candidates[key].pace - base.pace) * 60 <= 15);
    }).map(pacer => {
      let friend = constants.friends[pacer];

      friend.pace = {
        pace: candidates[pacer].pace,
        pace_legible: candidates[pacer].pace_legible
      }

      return friend;
    })
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
