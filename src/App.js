import { useEffect, useState } from "react";
import Words from "./Words";
function App() {
  const [CurrentLineValue , SetCurrentLineValue] = useState()
  const [ErrMsg , setErrMsg] = useState()
  const [InputIndex , setInputIndex] = useState(1)
  let wordindex = Math.floor(Math.random() * (Words.length))
  const InputField = document.getElementsByClassName("InputField")
  const Word = Words[wordindex]

  function CheckWord(e){
    let value = e.target.value
    if(value.toLowerCase() == Word){
      console.log("Correct")
    }else{
      for(let i = 0; i <5; i++){
        if(Word[i] == value[i].toLowerCase()){
          console.log("Green")
        }else if(Word.includes(value[i].toLowerCase())){
          console.log("Yellow")
        }else{
          console.log("grey")
        }e.target.disabled = true;
      }
    }
    InputField[InputIndex].focus()
    setInputIndex(InputIndex + 1)
}

  function HandleLineSubmit(e){
    const value = e.target.value
    if(value.length == 5){
      if(Words.indexOf(value.toLowerCase()) !== -1){
        setErrMsg("")
        CheckWord(e)
      }else{
        setErrMsg("Word not in wordset")
      }
    }else{
      setErrMsg("Word not long enough")
    }
  }

  return (
    <div className="App">
      <h1>Wordle Clone</h1>
      <input type="text" className="InputField" maxLength={5} onChange={event => {SetCurrentLineValue(event.target.value)}} onKeyPress={e => {if(e.which == 13){HandleLineSubmit(e)}}}/> <br />
      <input type="text" className="InputField" maxLength={5} onChange={event => {SetCurrentLineValue(event.target.value)}} onKeyPress={e => {if(e.which == 13){HandleLineSubmit(e)}}}/> <br />
      <input type="text" className="InputField" maxLength={5} onChange={event => {SetCurrentLineValue(event.target.value)}} onKeyPress={e => {if(e.which == 13){HandleLineSubmit(e)}}}/> <br />
      <input type="text" className="InputField" maxLength={5} onChange={event => {SetCurrentLineValue(event.target.value)}} onKeyPress={e => {if(e.which == 13){HandleLineSubmit(e)}}}/> <br />
      <input type="text" className="InputField" maxLength={5} onChange={event => {SetCurrentLineValue(event.target.value)}} onKeyPress={e => {if(e.which == 13){HandleLineSubmit(e)}}}/> <br />
      {ErrMsg}
    </div>
  );
}

export default App;
