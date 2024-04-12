var msg = "";

window.addEventListener("load", () => {
  
  document.getElementById("buttonConfirm").onclick = function () {
    if (document.getElementById("radioButtonPng").checked == true) {
      msg = "Png";
    } else {
      msg = "Jpeg";
    }
    alert(msg + " is selected.");
  };

  const canvas = document.getElementById("canvasMain");
  if (canvas.getContext){
    const ctx = canvas.getContext("2d");
    canvasMain.style.border = "2px solid"; //border around the canvas area
  };

});
