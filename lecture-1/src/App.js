import logo from './logo.svg';
import './App.css';

//javascript xml 
function App() {
  function add(){
    return 2+3;
  }
  return (
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
    <> //these are called fragments, they are used to group a list of children without adding extra nodes to the DOM.

    <h1>Welcome to React</h1>
    <h2>add={add()}</h2>
    <div>
      example of jsx
    </div>
    </>
    
    
    
    
  );
}

export default App;
