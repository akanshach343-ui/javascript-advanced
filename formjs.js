document.getElementById("signup").addEventListener("submit", function(event)
{event.preventDefault();
    validateform();
});
function validateform(){
    const userid= document.getElementById("uname").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const pass= document.getElementById("pswrd").value.trim();
    const cnpass= document.getElementById("cnfrmpswrd").value.trim();
    const message= document.getElementById('message');

    const emailpattern = /^[^]+@[^]+\.[a-z]{2,3}$/;

    if(!emailpattern.pattern.test(userid)){
        message.style.color="red";
        message.textcontent="x please enter a valid email address!";
        return;
    }

    if(contact.length !==10 || isNaN(constant)){
        message.textcontent="x contact number is invalid";
        return;
    }

    if(!pass.length>=8){
        message.textcontent="x enter a strong 8 digit password";
        return;
    }

    if(password !== cnpass){
        message.textcontent = "password is not matching"
    }

    message.textcontent = "form submitted succesfully";

    document.getElementById('signup').reset();

}