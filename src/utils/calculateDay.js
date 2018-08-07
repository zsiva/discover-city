function isAirportClosed(hours) {
  return calculateDay(hours).hours < 7;
}

function calculateDay(hours) {
  hours = Number(hours);
  var d = Math.floor(hours / 24);
  var h = Math.floor(hours % 24);
  var day = h >= 7 && h < 21 ? 'day' : 'night';
  var hDisplay = h > 12 ? h + ':00 ' : h + ':00 AM';
  return { hours: h, day: day, weekDay: d, hDisplay: hDisplay };
}

export { calculateDay, isAirportClosed };
