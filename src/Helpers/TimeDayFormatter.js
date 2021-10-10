const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const formatTime = (time) => {
  let dateReceived = new Date(time);
  let dispString = "";
  let hrs = dateReceived.getHours();
  let mins = dateReceived.getMinutes();
  dispString += `${
    hrs > 12 && hrs < 24 ? hrs - 12 : hrs === 0 ? hrs + 12 : hrs
  }`;
  dispString += `:${mins < 10 ? "0" + mins : mins} `;
  if (hrs >= 12) dispString += "PM";
  else dispString += "AM";
  return dispString;
};

export const formatDay = (time) => {
  let dateRx = new Date(time);
  let yMonth = dateRx.getMonth();
  let dayRx = day[dateRx.getDay()];
  let monthRx = month[yMonth];
  let yearRx = dateRx.getFullYear();
  let dRx = dateRx.getDate();
  let dispString = `${dayRx}, ${monthRx} ${dRx}`;

  let today = new Date();
  let tDate = today.getDate();
  let tMonth = today.getMonth();
  let tYear = today.getFullYear();
  if (tDate === dRx && tMonth === yMonth && tYear === yearRx) {
    return "Today";
  } else if (tDate - 1 === dRx && tMonth === yMonth && tYear === yearRx)
    return "Yesterday";
  if (dRx % 10 === 1) dispString += "st";
  else if (dRx % 10 === 2) dispString += "nd";
  else if (dRx % 10 === 3) dispString += "rd";
  else dispString += "th";
  return dispString;
};
