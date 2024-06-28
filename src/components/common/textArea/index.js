const TextArea = ({ label, field, type }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={field} className="form-label">{label}</label>
                <textarea type={type} className="form-control" id={field} name={field} />
            </div>
        </>
    )
}

export default TextArea