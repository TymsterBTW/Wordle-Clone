const Grid = (prop) => {
    return (
        <>
            {prop.list.map(item => (
                <div className="InputField" key={Math.random()} id={item.Colour}>{item.value}</div>
            ))}
        </>
    );
}
 
export default Grid;