const express= require('express');
const app=express();

const port=30001;

function getStudents(){
    let todo={
        1: 'Akansha',
        2: 'Anika', 
        3: 'Adnan'
    }
    return todo;
}

app.get('/', function(req, res){
    const name= getStudents();
    res.send(name);
}); //this returns json

//to return in html we can use:

app.get('/student', function(req, res){
    const name =getStudents();
    let html='<h2>Students List</h2><ul>';
    for(let key in name){
        html+=`<li> ${name[key]}</li>`;
    }
    html+='</ul>';
    res.send(html);
});

app.get('/teacher')



app.listen(3001);