const pace = {
  getPaceObject: (params) => {
    const pace = (params.moving_time / 60) / (params.distance / 1609.34);

    return {
      pace,
      pace_legible: getLegiblePace(pace)
    };
  },

  getAllPaces: (activityMap) => {
    let paceMap = {};

    for (let athlete in activityMap) {
      let activities = activityMap[athlete];

      paceMap[athlete] = getAveragePace(activities);
    }

    return paceMap;
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
    totals.time += activity.moving_time;

    return totals;
  }, { distance: 0, elapsed_time: 0 });

  return pace.getPaceObject(paceParams);
}

export default pace;
