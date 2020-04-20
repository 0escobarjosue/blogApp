import Ui from "./js/ui.js";
const ui = new Ui();

document.addEventListener("DOMContentLoaded", ui.loadRequests);
document.body.addEventListener("click", ui.deletePost);
document
  .querySelector("#btnSubmitPost")
  .addEventListener("click", ui.submitPost);
