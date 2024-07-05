import classNames from "classnames";

const TextInput = ({ label, field, type, value, error, touched, onChange }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={field} className="form-label">{label}</label>
                <input type={type} id={field} name={field} value={value} onChange={onChange} className={classNames("form-control", {
                    "is-invalid": error && touched
                })} />
                {
                    (error && touched) &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>
        </>
    );
}

export default TextInput;

