import { useState } from "react";
import Words from "./Words";
import Board from "./Components/Board";

function App() {
  const Letters = {
    gr : 'green',
    ye : 'yellow',
    ge : 'grey',
    no : 'none'
  }

  const [board , setboard] = useState(SetBoard_())
  const [alphabet , setalphabet] = useState(Init_Alphabet())
  const [position , setposition] = useState([0,0])
  const [word , setword] = useState(NewWord())

  function NewWord(){
    return Words[Math.floor(Math.random() * Words.length)]
  }


  function Init_Alphabet(){

    let alphabet = ["q" , "w" , "e" , "r" , "t" , "y" , "u" , "i" , "o" , "p" , "a" , "s" , "d" , "f" , "g" , "h" , "j" , "k" , "l" , "z", "x" , "c" , "v" , "b" , "n" , "m"]

    var dict = {}

    for (let i = 0; i < 25; i++){
      dict[alphabet[i]] = Letters.no
    }
    
    console.log()

    return dict
  }

  function SetBoard_(){
    let arr = [], row = 6, col = 5, fillValue = ""

    for (let i = 0; i < row; i++){
      let temp = {comp : false , items : []}
      for (let j = 0; j < col; j++){
       temp.items[j] = fillValue
      }
      arr.push(temp)
    }
    return arr
  }


  function HandleInput(code , char){

    if (code == 8){
      //backspace
      if (position[1] != 0){
        let temp_board = [...board]
        temp_board[position[0]].items[position[1] - 1] = ""

        setposition([position[0] , position[1] - 1])
      }
    }else if (code == 13){
      //enter

      if (position[1] == 5 && position[0] != 6){
        console.log("New line")
        let temp_board = [...board]
        temp_board[position[0]].comp = true
        setboard(temp_board)


        setposition([position[0] + 1 , 0])
      }
    }else if (code < 91 && code > 59){
      //key


      setalphabet(Change_Alphabet_(char , Letters.gr))

      if (position[1] != 5){
        //key press
        let temp_board = [...board]
        temp_board[position[0]].items[position[1]]= char

        if (position[0] != 0){
          temp_board[position[0] - 1].comp = false
        }


        setboard(temp_board)

        setposition([position[0] , position[1] + 1])
      }
    }

  }



  function Change_Alphabet_(letter , new_value){

    const temp = alphabet
    temp[letter] = new_value

    return temp
  }


  document.onkeydown = function(Event){
    console.log(position)
    HandleInput(Event.keyCode , Event.key)
  }


  return (
    <div className="App">
      <div>
        <h1>Title</h1>
      </div>
      <div className="board-container">
        <div className="board">
          {board.map(element => {
            return <Board 
            arr = {element}  
            alpha = {alphabet} 
            key={Math.random()}
            />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
