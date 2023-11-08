//login person name
var newusername = JSON.parse(localStorage.getItem("single"))
// login text
var text = document.getElementById("logintext")
text.innerText = newusername.username