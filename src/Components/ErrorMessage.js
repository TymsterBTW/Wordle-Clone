const ErrorMessage = (prop) => {
    return (
        <div className="ErorrMessage">
            <p>{prop.error}</p>
        </div>
    );
}
 
export default ErrorMessage;