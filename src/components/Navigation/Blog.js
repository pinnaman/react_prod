import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import MathJax from 'react-mathjax2'

//import "./styles.css";

const ascii = 'U = 1/(R_(si) + sum_(i=1)^n(s_n/lambda_n) + R_(se))'
const content = `This can be dynamic text (e.g. user-entered) text with ascii math embedded in $$ symbols like $$${ascii}$$`

const markdown = `
  # Header 1
  ## Header 2

  _ italic _

  ** bold **

  <b> bold Html </b>
  `;

const markdownContext = require.context('./posts', false, /\.md$/);
console.log(markdownContext);
console.log(markdownContext.keys());

class Blog extends Component {

  componentDidMount() {
    console.log('Component Mounted...')
  };

  render() {
  return (
    <div>
      <div>
        MarkDown Display:
        <h2>I am a {this.props.title.name} {this.props.title.model}!</h2>
        <ReactMarkdown source={markdown} />
      </div>
      <div>
      <MathJax.Context input='ascii'>
          <div>
             Inline Display AsciiMath: <MathJax.Node inline>{ ascii }</MathJax.Node>
          </div>
      </MathJax.Context>
      </div>
      <div>
      <MathJax.Context input='ascii'>
          <div>
             Block Display AsciiMath: <MathJax.Node>{ascii}</MathJax.Node>
          </div>
      </MathJax.Context>
      </div>
    </div>
  );
}
}

export default Blog; 