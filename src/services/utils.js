function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function dayOfWeek(dayInt) {
  let day = '';
  switch (dayInt) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
      break;
  }
}

export { getDaysInMonth, getFirstDayOfMonth, dayOfWeek };
