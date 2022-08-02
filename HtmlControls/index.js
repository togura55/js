var msg = "";

document.getElementById("buttonConfirm").onclick = function () {
  if (document.getElementById("radioButtonPng").checked == true) {
    msg = "Png";
  } else {
    msg = "Jpeg";
  }
  alert(msg + " is selected.");
};
