// function sum(a,b){
//     return parseInt(a)+parseInt(b);
// }

// let ans=sum(5,3);
// console.log(ans);

// sum till n
// const n=5;
// let s= n/2 *(1+ n);
// console.log(s);

// const fs= require("fs");

// function read(err, data){
//     console.log(data);
// }

// const contents=fs.readFile("a.txt", "utf-8", read);
// // console.log(contents);

// const cont=fs.readFileSync("b.txt", "utf-8");
// console.log(cont);
// fs.readFile("a.txt", "utf-8", read); //asynchronous
// fs.readFile("b.txt", "utf-8", read);
// console.log("done!");

// function timeout(){
//     console.log("click this btn");
// }

// console.log("hi");

// setTimeout(timeout, 1000);
// console.log("Welcome to loupe");

// let c=0;
// for(let i=0; i<10000000000; i++){
//     c+=1;
// }

// console.log("expensive function done");

//classes in js
class Rectangle{
    constructor(width, height, color){
        this.width=width;
        this.height= height;
        this.color=color;
    }
    area(){
        const area=this.width * this.height;
        return area;
    }

    paint(){
        console.log(`Painting with color ${this.color}`);
    }
}

const rect= new Rectangle(2,4);
const area=rect.area();
console.log(area);
// inheritance in js
class Animal{
    constructor(name){
        this.name=name;
    }
    speak(){
        console.log(`${this.name } makes sound`);
    }
}

class Dog extends Animal{
    constructor(name){
        super(name);
    }
    bark(){
        console.log("Woof!");
    }
}

const dog= new Dog("Tommy");
dog.speak(); //had to explicity call coz its a method, while constructor gets automatically called
dog.bark();

//here date is a class built in js helps in timewatch stopper etc
const now= new Date();
console.log(now.toISOString()); //outputs the date in ISO Format
console.log(now.getDate());

const map= new Map();
map.set('name','harkirat');
map.set('age', 30);
console.log(map);

//another inbuilt class is called a promise class 
/* 
promise class give promise that it will return something
in future something like callback approach and promise based approach 

callback version: setTimeout(callback, 3000);
promisified version: 
setTimeoutPromisified(3000).then(callback);
here this is function name only and then it calls the callback function we are assuming setTimeoutPromisified as global function
*/

//here resolve isnt a keyword but widely used variable argument name. 
//so we are here actually calling main but it gets called after 3s as the actual waitfor function says it
//so we wrapped it 

function waitFor3S(resolve){
    setTimeout(resolve, 3000);
}

function main(){
    console.log("main is called");
}

waitFor3S(main); //callback approach <-
//promisifeid version
function setTimeoutPromisified(){
    return new Promise(waitFor3S);
}

setTimeoutPromisified().then(main); //promisified

// function ramdom(){

// }
// let p=new Promise(random);
// console.log(p);

//readFile, writeFile, cleanFile using promise




