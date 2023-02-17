function setPageValues(input) {
  const { homeTeam, awayTeam, homeName, awayName, matchDate, matchLocation, awayColor, homeColor } = input;
  const date = new Date(matchDate);
  document.querySelector("#homeName").textContent = homeName;
  document.querySelector("#homeName").style.color = homeColor;
  document.querySelector("#awayName").textContent = awayName;
  document.querySelector("#awayName").style.color = awayColor;
  document.querySelector("#homeBadge").src = `../../assets/images/badges/${homeTeam}.png`;
  document.querySelector("#awayBadge").src = `../../assets/images/badges/${awayTeam}.png`;
  document.querySelector("#infoString").textContent = `${date.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })} | ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })} (${date.toLocaleTimeString(
    "en-GB",
    { hour: "numeric", minute: "numeric" }
  )}) | ${matchLocation}`;
}

module.exports = setPageValues;
