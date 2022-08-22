import { useEffect, useState } from "react";
import Grid from "./Grid";
import Title from "./Title";
import Words from "./Words";
function App() {
  const [row , setrow] = useState(0)
  const [output , setoutput] = useState(() => {
    let temp = [[],[],[],[],[],[]]
    temp.forEach(item => {
      for(let i = 0; i < 5; i ++){
        item.push("Test")
      }
    })
    console.log(temp)
    return temp;

  })
  //let temp = [..output] then modify and setoutput(temp)
  document.onkeypress = function(e){

    let c = e.keyCode
    if((64 < c && c < 91) || (96 < c && c < 123)){
      console.log(e.key)
    }
  }
  return (
    <div className="App">
      <Title/>
      <div className="input-container">
        {output.map(row => (
          <Grid key={Math.random()} list={row}/>
        ))}
      </div>
    </div>
  );
}

export default App;
