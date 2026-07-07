const express = require ('express');
const app = express()
const port=3000;

//routes
app.get('/', function(req, res){
    res.send('Welcome to my server');
})

app.get('/about', function(req, res){
    res.send('<h1><i>This is about page</i></h1>');
})

app.get('/contact', function(req, res){
    res.send('This is the contact page');
})

function calculateSum(a,b){
    return a+b;
}

app.get('/sum', function(req, res){
    const a=req.query.a;
    const b=req.query.b;
    const ans=calculateSum(Number(a),Number(b));
    res.send(ans.toString());
})



// app.listen(3000);
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})