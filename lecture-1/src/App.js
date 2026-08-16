import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

//javascript xml 
// function App() {
//   function add(){
//     return 2+3;
//   }
//   return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // <> //these are called fragments, they are used to group a list of children without adding extra nodes to the DOM.

    // <h1>Welcome to React</h1>
    // <h2>add={add()}</h2>
    // <div>
    //   example of jsx
    // </div>
//     </>
    
    
    
    
//   );
// }

function App(){
  return <div>
    <b>
      hi there
    </b>
    <Counter></Counter>
    {/* in above example i have written the function name in tag. what have i done
    rendered the counter, thus can see the 1 and button */}
  </div>
}

function Counter(){

  const [count, setCount]=useState(0);

  function increaseCount(){
    setCount(count+1);
  }

  function decreaseCount(){
    setCount(count-1);
  }

  function resetCount(){
    setCount(0);
  }

  // we can create setInterval function that whenever we open the app it automatically increase the counter
  // setInterval(function(){
  //   setCount(count+1);
  // },1000);

  useEffect(function(){
    setInterval(function(){
    setCount(function(count){
      return count+1;
    })
    },1000);
  },[]);

  // here the setiNterbval function runs infinitely because whenever the state is changed by the componet react automatically calls this app function again or  i.e. <counter>
  // thus we have to do:-> hooking into the lifecycle events of react:-> meaning run it only on the first render. i.e mounting

  //read about lifecycle events a lil i.e. mounting, re-rendering, unmounting -> import useEffect 



  // below is our component but we need a state to make it dynamic
  // hence instead of raw dom we will create a dynamic counter or give state to our component.
  // we cannot do this let count=0; and in increasecount function=> count++; wheere h1 id= text> {count} </h1> because these are raw inputs and react wont be 
  // able to understand all of this hence we need react useState which we learned is like an array

  return <div>
    <h1 id="text">{count}</h1>
    {/* here increasecounter is the syntax of how a function is called in replit, when a
    componet calls another function we declare it in the same scope only */}
    <button onClick={increaseCount}>Increase Count</button>
    <button onClick={decreaseCount}>Decrease Count</button>
    <button onClick={resetCount}>Reset Count</button>
  </div>
}

export default App;
