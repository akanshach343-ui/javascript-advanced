
//fetching query
// function addTodo(){
//     const inputEl=document.querySelector("input");
//     const val=inputEl.value;
//     console.log(val);
// }
function addTodo(){
    const task=document.querySelector("input");
    let val=task.value;
    const divEl= document.createElement("h4");
    document.querySelector("body").appendChild(divEl);
    divEl.innerHTML=val + "<button onclick='delete()'>Delete</button>";
}

//updating after every 1 seconds the numbers change
// let ctr=0;
// function callback(){
//     ctr =document.querySelectorAll("h4")[0].innerHTML;
//     console.log(ctr);
//     ctr=ctr+1;
// }
// setInterval(callback, 1000);