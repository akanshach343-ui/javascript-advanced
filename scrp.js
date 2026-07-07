
const addbtn =document.getElementById('addbtn');
const textinput =document.getElementById('textinput');
const tasklist =document.getElementById('tasklist');

addbtn.addEventListener('click',() =>
{
  const tasktext = textinput.value.trim();

  if(tasktext==="")
  {
    alert("please enter a task");
    return;
  }

  const list = document.createElement("li");
  list.textContent=tasktext;

  const delbtn= document.createElement("button");
  delbtn.textContent="delete";
  
  delbtn.addEventListener('click',() =>{
    list.remove();
  });

  list.appendChild(delbtn);
  tasklist.appendChild(list);

  taskinput.value="";

});