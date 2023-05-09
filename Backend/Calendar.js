

// returns an array of 7 consecutive-day Date() objects, ranging from Sun-Sat, and int offset weeks
// from the current week, or int offset + 1 weeks from the current week if it is currently Sat.
function calculateWeek(offset) {
  let today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 6 ? 7 : 0) + (offset * 7)));
  let weekArray = [new Date(sunday)];
  for (let i = 0; i < 6; i++) {
    weekArray.push(new Date(sunday.setDate(sunday.getDate() + 1)));
  }
  return weekArray;
}

module.exports = {
  calculateWeek: calculateWeek
}