function setPageValues(input) {
  const { homeScore, awayScore, homeTeam, awayTeam } = input;
  document.querySelector("#homeScore").textContent = homeScore;
  document.querySelector("#awayScore").textContent = awayScore;
  document.querySelector("#homeBadge").src = `../../assets/images/badges/${homeTeam}.png`;
  document.querySelector("#awayBadge").src = `../../assets/images/badges/${awayTeam}.png`;
}

module.exports = setPageValues;
