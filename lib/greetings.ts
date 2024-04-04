const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Greetings = (): [string, string] => {
  const date = new Date();

  const dayName = dayNames[date.getDay()];
  const day = date.getDate();

  let suffix = "th";
  if (day === 1 || (day > 20 && day % 10 === 1)) {
    suffix = "st";
  } else if (day === 2 || (day > 20 && day % 10 === 2)) {
    suffix = "nd";
  } else if (day === 3 || (day > 20 && day % 10 === 3)) {
    suffix = "rd";
  }

  const monthName = monthNames[date.getMonth()];

  const hours = date.getHours();
  let timeOfDay: string;
  if (hours < 12) {
    timeOfDay = "Good Morning";
  } else if (hours < 18) {
    timeOfDay = "Good Afternoon";
  } else {
    timeOfDay = "Good Evening";
  }

  const time = `${dayName}, ${monthName} ${day}${suffix}`;
  const salutation = timeOfDay;

  return [time, salutation];
};
