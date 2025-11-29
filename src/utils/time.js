export const convertUnixTimeToLocal = (unixTime) => {
  const milliseconds = unixTime * 1000;
  const d = new Date(milliseconds);
  return {
    fullDate: d.toLocaleDateString("en-us", { day: "numeric", month: "short", year: "numeric" }),
    time12h: d.toLocaleTimeString("en-us", { hour12: true, hour: "numeric", minute: "2-digit" }),
  };
};