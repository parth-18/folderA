var myIndex = 0;
carousel();
function carousel() {
  var i;
  var x = document.getElementsByClassName("slide");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}
var modal = document.getElementsByClassName("modal");
var stu = document.getElementsByClassName("login");
var span = document.getElementsByClassName("close")[0];
stu[0].onclick = function(){
  modal[0].style.display = "block";
}
span.onclick = function close(){
  modal[0].style.display = "none";
}
window.onclick = function(event) {
  if(event.target == modal[0]) {
    modal[0].style.display = "none";
  }
}