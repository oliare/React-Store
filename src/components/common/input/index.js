const TextInput = ({ label, field, type, value, onChange, error, className }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={field} className="form-label">{label}</label>
                <input type={type} id={field} name={field} value={value} onChange={onChange} className={className} />
                {error && (<div className="invalid-feedback">{error}</div>)}
            </div>
        </>
    );
}

export default TextInput;

