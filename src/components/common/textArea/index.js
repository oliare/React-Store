import classNames from "classnames";

const TextArea = ({ label, field, type, value, error, touched, onChange }) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={field} className="form-label">{label}</label>
                <textarea id={field} name={field} value={value} type={type} onChange={onChange} touched={touched}
                    className={classNames("form-control", { "is-invalid": error && touched })}></textarea>
                {(error && touched) &&

                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>
        </>
    );
}

export default TextArea;