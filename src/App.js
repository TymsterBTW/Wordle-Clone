import { useEffect, useState , React } from "react";
import ReactDOM from "react-dom"
import EndGamePanel from "./Components/EndGamePanel";
import ErrorMessage from "./Components/ErrorMessage";
import Keyboard from "./Components/Keyboard";
import Row from "./Components/Row";
import Title from "./Components/Title";
import Words from "./Words";
function App() {
  const [position , setposition] = useState([0,0]) //first refers to row second refers to place in the row
  const [word , setword] = useState("") //current word to guess
  const [gamestatus ,setgamestatus] = useState([false , false]) //first refers to game ended and second to victory or not
  const [error , seterrormessage] = useState("")
  const [output , setoutput] = useState(FillGrid())
  const [Letters , setLetters] = useState(FillLettersKeyboard())
  function FillLettersKeyboard(){
    let Alphabet = "qwertyuiopasdfghjklzxcvbnm"
    let temp = []
    for(let i = 0; i < 26; i ++){
      temp.push({letter : Alphabet[i] , color: 'transparent'})
    }
    return temp
  }
  function FillGrid(){
    let temp = [[],[],[],[],[],[]]
    temp.forEach(item => {
      for(let i = 0; i < 5; i ++){
        var x = {
          Colour : 'transparent',
          value : ''
        }
        item.push(x)
      }
    })
    return temp;
  }
  useEffect(() => {
    NewWord()
  },[])
  document.onkeydown = (event) => {OnInput(event)}
  function OnInput(e){
    const Letters = document.getElementsByClassName("InputField")
    if(gamestatus[0] == false){
      let c = e.keyCode 
      if(((64 < c && c < 91) || (96 < c && c < 123)) && (!e.ctrlKey && !e.altKey && !e.metaKey)){
          if(position[1] === 5){
            //nothing
          }else{
            let temp = [...output]
            temp[position[0]][position[1]].value = e.key
            Letters[position[0] * 5 + position[1]].classList.add("zoomout")
            setoutput(temp)
            setposition([position[0] , position[1] + 1])
          }
      }else if(c === 8){
        if(position[1] >= 1){
          let temp = [...output]
          temp[position[0]][position[1] - 1].value = ""
          temp[position[0]][position[1] - 1].Colour = "transparent"
          setoutput(temp)
          setposition([position[0] , position[1] - 1])
        }
      }else if(c === 13){
        if(position[1] === 5){
          CheckWord()
        }else{
          ChangeError("Word needs to be 5 letters long")
        }
      }
    }
  }
  function ChangeError(msg){
    seterrormessage(msg)
    setTimeout(() => {
      seterrormessage("")
    },2000)
  }
  function SetKeyColor(key , color){
    for(let i = 0; i < 26; i++){
      if(Letters[i].letter == key){
        let temp = [...Letters]
        temp[i].color = color
        setLetters(temp)
      }
    }
  } 
  function CheckWord(){
    const LettersList = document.getElementsByClassName("InputField")
    var wordString = ""
    for(let i = 0; i < 5; i ++){
      wordString += output[position[0]][i].value
    }
    if(Words.indexOf(wordString) === -1){
      ChangeError("Word not in wordset")
      return;
    }
    var i = 0
    var coolanimation = setInterval(() => {
      if(i === 4){
        clearInterval(coolanimation)
      }
      if(word[i] === wordString[i]){
        //green
        LettersList[position[0] * 5 + i].classList.add("Correct")
        output[position[0]][i].Colour = "green"

      }else if(word.includes(wordString[i])){
        //yellow
        LettersList[position[0] * 5 + i].classList.add("ElseWhere")
        output[position[0]][i].Colour = "yellow"
      }else{
        //grey
        LettersList[position[0] * 5 + i].classList.add("Incorrect")
        output[position[0]][i].Colour = "grey"
      }
      i += 1
    },450)
    setTimeout(() => {
      if(word.toLowerCase() === wordString.toLowerCase()){
        setgamestatus([true , true])
      }else if(position[0] == 5){
        setgamestatus([true , false])
      }
      return;
    },3000)
    //next row
    if(position[0] == 5){
    }else{  
      setposition([position[0] + 1 , 0])
    }
  }

  function NewWord(){
    let word = Words[Math.floor(Math.random() * Words.length)]
    setword(word)
  }

  function NewGame(){
    setposition([0,0])
    setgamestatus([false , false])
    setoutput(FillGrid())
    setLetters(FillLettersKeyboard()) 
    NewWord()
  }
  return (
    <div className="App" id="App">
      <Title/>
      {error !== "" && <ErrorMessage error={error}/>}
      {gamestatus[0] == true && <EndGamePanel victory={gamestatus[1]} guesses={position[0]} newgame={NewGame} word={word}/>}
      <div className="input-container">
        {output.map(row => (
          <Row list={row} key={output.indexOf(row)} />
        ))}
      </div>
      <Keyboard data={Letters}/>
    </div>
  );
}

export default App;
