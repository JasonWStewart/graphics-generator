function setPageValues(input) {
  let imagePath = "../../assets/images/placeholder.jpg";
  if (input.imageUploadName) {
    imagePath = `../../uploads/${input.imageUploadName}`;
  }

  document.querySelector("#profileImage").src = imagePath;
  document.querySelector("#nameText").textContent = input.nameText;
  document.querySelector("#roleText").textContent = input.roleText;
}

module.exports = setPageValues;
