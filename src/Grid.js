const Grid = (prop) => {
    console.log(prop.list)
    return (
        <div className="">
            {prop.list.map(value => (
                <div className="InputField" key={Math.random()}>{value}</div>
            ))}
        </div>
    );
}
 
export default Grid;