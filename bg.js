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

var email = document.forms['form']['email'];
var pass = document.forms['form']['password'];
var e_err = document.getElementById('mail');
var p_err = document.getElementById('pass');

function validate(){
  if(email.value.length < 8 || email.value.length==='undefined' || pass.value.length < 8 || pass.value.length==='undefined'){
    if(email.value.length < 8 || email.value.length==='undefined'){
    email.style.border = "1px solid red";
    e_err.style.display = "block";
    email.focus();
    }
    if(pass.value.length < 8 || pass.value.length==='undefined'){
      pass.style.border = "1px solid red";
      p_err.style.display = "block";
      pass.focus();
    }
  return false;
  }
  else{
    return true;
  }
}
var acc = document.getElementsByClassName("accordion");
var i,j;
var panels  = document.getElementsByClassName("panel");

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel= this.nextElementSibling;
    var sy = this.firstElementChild;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      $(".faq span").show()
    } else {
      for (j = 0; j < panels.length; j++) {
      panels[j].style.maxHeight = null;
      $(".faq span").show()
      }
      sy.style.display = 'none';
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
