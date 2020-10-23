import React from 'react';
import './App.css';
import Instructions from '../Instructions/Instructions.js';
import NavigationBar from "../Navigation/NavigationBar.js"
import Home from '../Navigation/Home.js';
import About from '../Navigation/About.js';
import Blog from '../Navigation/Blog.js';
//import Contact from '../Navigation/Contact.js';
import Gallery from '../Media/Gallery.js';
import Emojis from '../Navigation/Emojis.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const PropsPage = ({title}) => {
  return (
    <h3>{title}</h3>
  );
};

function App() {
  const greeting = "greeting";
  const displayAction = false;
  return(
    <Router>
    <div>
      <NavigationBar />
      <div className="container">
          { /* 
          <div className="container">
            <h1 id={greeting}>Hello, Ajay!</h1>
            {displayAction && <p>I am writing JSX</p>}
          
            <Instructions />
            <Emojis />
          
          </div>
          */ }
        {/*  <Link to="/blog">Props through render</Link> */ }
          <Switch>
              <Route exact path='/home' component={Home} />
            {/*  <Route exact path="/blog" component={PropsPage} /> */}
              <Route exact path="/blog" 
                     render={(props) => <Blog {...props} 
                     title={`BLOG`} />} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/ananya' component={Gallery} />
              <Route path="/ananya/:title" component={Gallery}/>
          </Switch>
          </div>
      </div>
    </Router>
  )
}

export default App;