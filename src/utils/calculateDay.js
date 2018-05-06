function getDay(text) {
  switch (text) {
    case 0:
      return 'Monday ';
    case 1:
      return 'Tuesday ';
    case 2:
      return 'Wednesday ';
    case 3:
      return 'Thursday ';
    case 4:
      return 'Friday ';
    case 5:
      return 'Saturday ';
    case 6:
      return 'Sunday ';
    default:
      return 'Sunday ';
  }
}

function isAirportClosed(hours) {
  return calculateDay(hours).hours < 7;
}

function calculateDay(hours) {
  hours = Number(hours);
  var d = Math.floor(hours / 24);
  var h = Math.floor(hours % 24);
  var day = h >= 7 && h < 21 ? 'day' : 'night';
  var dDisplay = getDay(d);
  var hDisplay = h > 12 ? h + ':00 ' : h + ':00 AM';
  return { time: dDisplay + hDisplay, hours: h, day: day };
}

export { calculateDay, isAirportClosed };
