const TextArea = ({ label, field, value, onChange, error, className }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={field} className="form-label">{label}</label>
                <textarea id={field} name={field} value={value} onChange={onChange} className={className}></textarea>
                {error && (<div className="invalid-feedback">{error}</div>)}
            </div>
        </>
    );
}

export default TextArea;