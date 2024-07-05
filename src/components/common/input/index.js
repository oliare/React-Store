import classNames from "classnames";

const TextInput = ({ label, field, type, value, error, onChange }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={field} className="form-label">{label}</label>
                <input type={type} id={field} name={field} value={value} onChange={onChange} className={classNames("form-control", {
                    "is-invalid": error
                })} />
                {error && (<div className="invalid-feedback">{error}</div>)}
            </div>
        </>
    );
}

export default TextInput;

