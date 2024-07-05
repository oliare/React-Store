import classNames from "classnames";

const TextArea = ({ label, field, type, value, error, onChange }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={field} className="form-label">{label}</label>
                <textarea id={field} name={field} value={value} type={type} onChange={onChange}
                    className={classNames("form-control", { "is-invalid": error })}></textarea>
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>
        </>
    );
}

export default TextArea;