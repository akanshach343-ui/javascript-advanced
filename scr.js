function greet(name="student") //or just greet(name) will take parameters and student will be default
{
    console.log("hello"+ name);

}

greet("Akansha");

//for numbers

function add(a, b=3)
{
    return a+b;
}

console.log(add(2,3));
console.log(add(5));

function bonus(salary, bonus=salary*0.10)
{
    return salary+bonus;
}
console.log(bonus(20000));

//rest parameter three dots defines it, should always be defined at last

function add(...numbers)
{
    let sum=0;
    for(let n of numbers)
    {
        sum+=n;
    }
    console.log(sum);
}

add(1,2,3,4,50);

function studentdetails(name,...marks)
{
    console.log(name);
    console.log(marks);
}
studentdetails("Akansha",98, 99, 100, 97, 100);

//spread operator
let a=[1,2,3];
let b=[...a,4,5];
console.log(b);

let arr1 =[10,20,30];
let arr2=[...arr1,40];
let mergearr=[...arr1,...arr2];
console.log(arr2);
console.log(mergearr);

let user={name:"akansha", roll:15}
let updateuser={...user, city:"delhi"};
console.log(user);
console.log(updateuser);


let name ="Rahul";
let age=22;

let student={
    Name,
    age,
    showDetails(){
        console.log(Name + "is"+ age);
    }
}



