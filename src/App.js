import { useEffect, useState } from "react";
import Row from "./Row";
import Title from "./Title";
import Words from "./Words";
function App() {
  const [position , setposition] = useState([0,0]) //first refers to row second refers to place in the row
  const [word , setword] = useState("")
  const [output , setoutput] = useState(() => {
    let temp = [[],[],[],[],[],[]]
    temp.forEach(item => {
      for(let i = 0; i < 5; i ++){
        item.push("")
      }
    })
    return temp;

  })
  var Word
  useEffect(() => {
    setword(NewWord())
  },[])
  //let temp = [..output] then modify and setoutput(temp)
  document.onkeydown = function(e){
    let c = e.keyCode
    if((64 < c && c < 91) || (96 < c && c < 123)){
        console.log("letter")
        if(position[1] == 5){
          //nothing
        }else{
          let temp = [...output]
          temp[position[0]][position[1]] = e.key
          setoutput(temp)
          setposition([position[0] , position[1] + 1])
        }
    }else if(c == 8){
      if(position[1] >= 1){
        let temp = [...output]
        temp[position[0]][position[1]] = ""
        setoutput(temp)
        setposition([position[0] , position[1] - 1])
      }
    }else if(c == 13){
      console.log("enter")
      if(position[1] == 5){
        CheckWord()
      }
    }
  }
  function CheckWord(){
    const Letters = document.getElementsByClassName("InputField")
    console.log(word)
    var wordString = output[position[0]].toString().replace(/,/g , "").toLowerCase() //converting array to string
    if(Words.indexOf(wordString) == -1){
      console.log("word not in wordset")
    }else if(word == wordString.toUpperCase()){
      for(let i = 0; i < 5; i++){
        Letters[position[0] * 5 + i].classList.add("correct")
      }
    }else{
      var i = 0
      var coolanimation = setInterval(() => {
        if(i == 4){
          clearInterval(coolanimation)
        }
        if(word[i] == wordString[i]){
          //green
          Letters[position[0] * 5 + i].classList.add("Correct")
        }else if(word.includes(wordString[i])){
          Letters[position[0] * 5 + i].classList.add("ElseWhere")
        }else{
          Letters[position[0] * 5 + i].classList.add("Incorrect")
        }
        i += 1
      },500)
      setposition([position[0] + 1 , 0])
    }
  }
  function NewWord(){
    let word = Words[Math.floor(Math.random() * Words.length)]
    return word
  }
  return (
    <div className="App">
      <Title/>
      <div className="input-container">
        {output.map(row => (
          <Row list={row} key={output.indexOf(row)} />
        ))}
      </div>
    </div>
  );
}

export default App;
