function setPageValues(input) {
  const { homeScore, awayScore } = input;
  document.querySelector("#homeScore").textContent = homeScore;
  document.querySelector("#awayScore").textContent = awayScore;
}

module.exports = setPageValues;
