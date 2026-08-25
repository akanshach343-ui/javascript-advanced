// // import logo from './logo.svg';
// // import './App.css';
// // import { useState, useEffect } from 'react';

// // //javascript xml 
// // // function App() {
// // //   function add(){
// // //     return 2+3;
// // //   }
// // //   return (
// //     // <div className="App">
// //     //   <header className="App-header">
// //     //     <img src={logo} className="App-logo" alt="logo" />
// //     //     <p>
// //     //       Edit <code>src/App.js</code> and save to reload.
// //     //     </p>
// //     //     <a
// //     //       className="App-link"
// //     //       href="https://reactjs.org"
// //     //       target="_blank"
// //     //       rel="noopener noreferrer"
// //     //     >
// //     //       Learn React
// //     //     </a>
// //     //   </header>
// //     // </div>
// //     // <> //these are called fragments, they are used to group a list of children without adding extra nodes to the DOM.

// //     // <h1>Welcome to React</h1>
// //     // <h2>add={add()}</h2>
// //     // <div>
// //     //   example of jsx
// //     // </div>
// // //     </>




// // //   );
// // // }

// // function App(){
// //   return <div>
// //     <b>
// //       hi there
// //     </b>
// //     <Counter></Counter>
// //     {/* in above example i have written the function name in tag. what have i done
// //     rendered the counter, thus can see the 1 and button */}
// //   </div>
// // }

// // function Counter(){

// //   const [count, setCount]=useState(0);

// //   function increaseCount(){
// //     setCount(count+1);
// //   }

// //   function decreaseCount(){
// //     setCount(count-1);
// //   }

// //   function resetCount(){
// //     setCount(0);
// //   }

// //   // we can create setInterval function that whenever we open the app it automatically increase the counter
// //   // setInterval(function(){
// //   //   setCount(count+1);
// //   // },1000);

// //   useEffect(function(){
// //     setInterval(function(){
// //     setCount(function(count){
// //       return count+1;
// //     })
// //     },1000);
// //   },[]);

// //   // here the setiNterbval function runs infinitely because whenever the state is changed by the componet react automatically calls this app function again or  i.e. <counter>
// //   // thus we have to do:-> hooking into the lifecycle events of react:-> meaning run it only on the first render. i.e mounting

// //   //read about lifecycle events a lil i.e. mounting, re-rendering, unmounting -> import useEffect 



// //   // below is our component but we need a state to make it dynamic
// //   // hence instead of raw dom we will create a dynamic counter or give state to our component.
// //   // we cannot do this let count=0; and in increasecount function=> count++; wheere h1 id= text> {count} </h1> because these are raw inputs and react wont be 
// //   // able to understand all of this hence we need react useState which we learned is like an array

// //   return <div>
// //     <h1 id="text">{count}</h1>
// //     {/* here increasecounter is the syntax of how a function is called in replit, when a
// //     componet calls another function we declare it in the same scope only */}
// //     <button onClick={increaseCount}>Increase Count</button>
// //     <button onClick={decreaseCount}>Decrease Count</button>
// //     <button onClick={resetCount}>Reset Count</button>
// //   </div>
// // }

// // export default App;

// import {useState} from 'react';
// import "./App.css";

// export default function App(){
//   //instead best way is to useRef hook, react-hook-forms or using more state variables

//   const [todos, setTodos] = useState([{
//     title: "Go to gym",
//     description: "hit the gym regularly",
//     done: false
//   },]);

//   function addTodo(){
//     // let newArray=[...todos];

//     // newArray.push({
//     //   title: "create project",
//     //   description: "work on project regularly",
//     //   done: true,
//     // })
//     // setTodos(newArray);
//     setTodos([...todos,{
//       title: document.getElementById("title").value,
//       description: document.getElementById("description").value,
//       done:true,
//     }]);

//   }

//   return(
//     <div>

//       Title: 
//       <input id="title" type='text' placeholder='add title for your todo'/> <br/>
//       <br/>
//       {/* it strictly follows semantic rules and self closing tags rule */}
//       Description:
//       <input id="description" type="text" placeholder=" add description here"/><br/>

//       <button onClick={addTodo}>Add Todo</button>
//       <br/>

//       {/* iterating over elements of array */}
//       {todos.map((todo)=>{
//         <Todo title = {todo.title} description ={todo.description} done= {todo.done}/>
//       })}

//       {/* setting props here */}

//       <Todo title={"akansha"} description={"akansha's todo"} done={true}/>
//     </div>
//   )
// };

// // adding another componente called props to print the object in pretty fashion

// function Todo(props){
//   return(
//     <div>
//       <h1>{props.title}</h1>
//       <h1>{props.description}</h1>
//       <h1>{props.done ? "Task is done": "Task is pending"}</h1>
//     </div>
//   )
// };
import { use, useState } from "react";


function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count+1);
  }
  
    //adding event handler here
  // function handleClick(){
  //   alert('You clicked me!');
  // }
  return (
    <button onClick={handleClick}>I'm a button clicked {count} times</button>
  );
}

function AboutPage() {
  return (
    <div>
      <h1> About</h1>
      <p>Hello there. <br />How do you do?</p>
      <img className="avatar" />
    </div>
  )
}

const user = {
  name: 'Akansha',
  imageUrl: 'https://react.dev/images/docs/scientists/yXOvdOSs.jpg',
  imageSize: 90,
}

function Profile() {
  return (
    <div>
      <h1>{user.name}</h1>
      <img
        className="avat"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </div>
  )
}

//conditional rendering: 3 ways
function AdminPanel(){
  return(
    <div>
      <i> This is admin panel welcome to the page.</i>
    </div>
  )
}

function LoginForm(){
  return(
    <div>
      <i> Sorry. You have to login first.</i>
    </div>
  )
}

// function Compnent(){
//   let isLoggedIn = false;
//   let content;
//   if (isLoggedIn) {
//     content = <AdminPanel />
//   } else {
//     content = <LoginForm />;
//   }
//   return (
//     <div>
//       {content}
//     </div>
//   );
// }

//shorter more compact code using conditional operator

function Compnent(){
  let isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? (<AdminPanel/>) : (<LoginForm/>)}
    </div>
    // much shorter syntax
    /*
    <div> {isLoggedIn && <AdminPanel/>}</div>
     */
  );
}

//rendering lists. using for loop and array map() function to render lists of components.
function ListsRendering(){
// const products= [
//   {title: 'Cabbage', id:1},
//   {title: 'Garlic', id: 2},
//   {title: 'Apple', id: 3},
// ]

//much more complex and lil styling, add boolean is fruit
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

//now inside ur component use the map() function to transform an array of products into an aarray of <li> items;
const listItems= products.map(product=>
  //adding key here is good. coz when dynamically adding the element react wont or might lose out on some elements
  <li key={product.id}
  style={{
    color: product.isFruit ? 'magenta' : 'darkgreen'
  }
  } >
    {product.title}
  </li>
);

return(
<ul>
  {listItems}
</ul>
)
}

/*  using for loop for rendering
function ListsRendering() {
  const products = [
    { title: 'Cabbage', id: 1 },
    { title: 'Garlic', id: 2 },
    { title: 'Apple', id: 3 },
  ];

  const listItems = [];
  for (let i = 0; i < products.length; i++) {
    listItems.push(
      <li key={products[i].id}>{products[i].title}</li>
    );
  }

  return (
    <ul>
      {listItems}
    </ul>
  );
}

*/

//responding to events: - by declaring event handler functions inside ur components. taking Mybutton for example.
//now when u want to remember some info and display it. For example, maybe u want to count the no of times a butn is clicked. to do this, add state ur component. 
//to do this import useSTATE FROM react. 




export default function App() {
  return (
    <div>
      <h1> Welcome to my app</h1>
      <MyButton/>
      <MyButton /><br />
      <Profile />
      <Compnent/><br/><br/>
      <ListsRendering/>

    </div>
  )
}

//in react u specify css class with className or functional compents. 
