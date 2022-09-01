const Keyboard = (prop) => {
    return (
        <div className="keyboard">
            {prop.data.map(values => (
                <div key={Math.random()} id={values.color} className="key" onClick={(event) => {console.log(event)}}>{values.letter}</div>
            ))}
        </div>
    );
}
 
export default Keyboard;