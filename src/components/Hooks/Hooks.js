import React, { useState, useEffect } from "react";

export default function Hooks() {
  const [buttonText, setButtonText] = useState("Click me, please");
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  useEffect(
      () => {
          document.title = `You clicked ${count} times.`;
      },
      [count]
  );

  //alert(this.props.album);

  return (
    <div>
    <button onClick={() => setButtonText("Hook1=>Thanks, been clicked!")}>
      {buttonText}
      <h3>{"Hook2=>"}{count}</h3>
      <button onClick={increment}>Increment</button>
    </button>
    </div>
  );
}