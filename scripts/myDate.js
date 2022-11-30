//First format  the date with this function

export function formatDMYtoYMD(dateInDMY) {
  //formats a DMY date joint by "." into YMD format join by ".".
  let formattedDate = dateInDMY.split(".").reverse().join("/");
  return formattedDate;
}

//Then you can get the week number from the date. By making a new MyDate and calling getWeek() passing the formatted date as a parameter.
export class MyDate extends Date {
  getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }
}
