import {  useEffect, useState } from "react";
import Words from "./Words";
function App() {
  const [position , setposition] = useState([0,0])  // first refers to row and second refers to place'
  const [save , setsave] = useState([])
  const [currentguess , setcurrentguess] = useState(["","","","",""])
  const [output , setoutput ] = useState([])
  var word = ""
  useEffect(() => {
    let load = []
    for(let i = 0; i < 30; i ++){
      load.push("")
    }
    setoutput(load)
    word = Words[Math.floor(Math.random() * Words.length - 1)]
    console.log(word)
  },[])
  
  function updateoutput(){
    console.log("inside function")
    let newoutput = output
    newoutput[(position[0] * 5) + position[1]] = currentguess[position[1]]
    console.log(newoutput)
    setoutput(newoutput)
  }
  function CheckWord(){
    
  }
  document.onkeypress = function (e) {
    console.log(typeof currentguess)
    let c = e.keyCode
    if(currentguess.length > 5 ){
      if(c == 8){
        setcurrentguess(currentguess.pop())
        updateoutput()
      }else if(c==13){
        console.log("enter")
        CheckWord()
      }
    }else if (96 < c && c < 123 || 64 < c && c < 91){
      console.log(e.key.toUpperCase())
      console.log(typeof currentguess)
      let temp = currentguess.push(e.key.toUpperCase())
      setcurrentguess(temp)
      updateoutput()
      setposition([position[0] , position[1] + 1])
    }else if(c == 8){
      console.log("pop")
      setcurrentguess(currentguess.pop())
      updateoutput()
    }
  }
  return (
    <div className="App" onKeyPress={e => {console.log("pressed")}}>
      <div className="title-container">
        <h1 className="title">Wordle Clone</h1>
      </div>
      <div className="input-container">
        {output.map(value => (
          <div className=" InputField" key={Math.random()}>{value}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
