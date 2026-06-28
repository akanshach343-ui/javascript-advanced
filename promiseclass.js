const promise= new Promise(function(resolve,reject){
    resolve("HELLO");
});

/*promise.then(function(data){
    console.log(data);
});*/
function callback(data){
    console.log(data);
}

promise.then(callback);

//suppose student passes if marks>40 
function res(resolve, reject){
    const marks= 75;

    if(marks>=40){
        resolve("pass");
    }else{
        reject("Fail");
    }
};
const result= new Promise(res);
//consuming it
result.then(function(msg){
    console.log(msg);
}).catch(function(err){
    console.log(err);
});

//promise to resolve hello world
function greet(){
    console.log("hello world");
}

function print(){
    return new Promise(function(resolve,reject){
        let i=greet();
        console.log("resolve executed");
        resolve(i);
    });
}
print().then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.log(error);
}); //output: undefined coz the resolve isnt returning anything thus use return statement in greet function not print

//promise that always rejects with error occured
function sum(){
    return 2+3;
}
function alwaysRejects(){
    return new Promise((resolve, reject)=>{
        let a=sum();
        if(a<0){
            resolve(a);
        }else{
            reject("error occured");
        }
    })
}

alwaysRejects().then((resolve)=>{
    console.log(resolve);
}).catch((reject)=>{
    console.log(reject);
})

let age=20;
function valid(age){
    return new Promise((resolve, reject)=>{
        if(age>=18){
            resolve("Eligible to vote");
        }else{
            reject("Not eligible");
        }
    });
}

valid(age).then((data)=>{
    console.log(data);
}).catch((reject)=>{
    console.log(reject);
})