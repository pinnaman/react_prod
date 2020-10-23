import React from 'react';
import './App2.css';
//import Instructions from '../Instructions/Instructions.js';
//import Emojis from '../Navigation/Emojis.js';
import NavigationBar from "../Navigation/NavigationBar.js"
import Home from '../Navigation/Home.js';
//import About from '../Navigation/About.js';
import Blog from '../Navigation/Blog.js';
import Gallery from '../Media/Gallery.js';
import Hooks from '../Hooks/Hooks.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
/********************/ 
const carinfo = {name: "Ford", model: "Mustang"};

/**
 * Style definitions.
 * width: '700px',height: '750px',
 * width: '250px',height: '750px', 
 */
const STYLE = {
  infoColor: {
      color: 'green',
      backgroundColor : '#344d56'
  },
  warningColor: {
      color: 'orange',
      backgroundColor : '#3f3f3f', marginLeft: '50px'
  },
  errorColor: {
      color: 'red',
      backgroundColor : '#3f3f3f'
  }
};
/***************************************/ 

function App() {
  
  return(
    <Router>
    
      <NavigationBar />
     { /* <div className="container">  */ }
      <div className="row">
      <div className="left" style={STYLE.warningColor}>
        
        <p>Left Side Bar Menu</p>
      </div>
    { /*  <div className="row" style={STYLE.infoColor}>  */ }
      <div className="middle" style={STYLE.infoColor}>
        
        <p>Center</p>
          { /* 
          <div className="container">
            <h1 id={greeting}>Hello, Ajay!</h1>
            {displayAction && <p>I am writing JSX</p>}
          
            <Instructions />
            <Emojis />
          
          </div>
          */ }
          <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path="/blog" 
                     render={(props) => <Blog {...props} 
                     title={carinfo} />} 
              />
            {/*  <Route exact path='/about' component={Hooks} /> */}
              <Route exact path="/about" 
                     render={(props) => <Hooks {...props} 
                     album={`general`} />} 
              />
            { /* <Route exact path='/ananya2' component={Gallery} /> */ }
              <Route exact path="/ananya" 
                     render={(props) => <Gallery {...props} 
                     album={`artwork`} />} 
              />
              <Route exact path="/anvika" 
                     render={(props) => <Gallery {...props} 
                     album={`anvika`} />} 
              />
              <Route exact path="/garden" 
                     render={(props) => <Gallery {...props} 
                     album={`garden`} />} 
              />
              <Route exact path="/general" 
                     render={(props) => <Gallery {...props} 
                     album={`general`} />} 
              />
              <Route exact path="/graphics" 
                     render={(props) => <Gallery {...props} 
                     album={`graphics`} />} 
              />
              
          </Switch>
          </div>

        <div className="right" style={STYLE.errorColor}>
          
          <p>Right Side Bar Menu</p>
        </div>

      </div> {/* row */ }
    </Router>
  )
}

export default App;