import { useState } from "react";

const EndGamePanel = (prop) => {
    const [defintion , setdefinition] = useState("")
    const [ok , setok] = useState(false)
    var url = `https://api.dictionaryapi.dev/api/v2/entries/en/${prop.word}`
    var WordDefinition = ""
    fetch(url)
        .then(res => {
            if(res.ok){
                setok(true)
            }else{
                throw new Error("Not Found")
            }
            return res.json()
        })
        .then(data => {
            setdefinition(data[0].meanings[0].definitions[0].definition)
        })
    console.log(prop.word)
    return (
        <div className="EndGamePanel">
            <h1 className="victory" style={{textShadow : '5px 5px 10px black'}}>{prop.victory ? "Victory" : "Failure"}</h1>
            {prop.victory && <p>Guesses Taken : {prop.guesses}</p>}
            {!prop.victory && <p>The word was: {prop.word}</p>}
            {ok && <p className="definition">{defintion}</p>}
            
            <button className="newgame" onClick={() => {prop.newgame()}}>New Game</button>
        </div>
    );
}   
 
export default EndGamePanel;