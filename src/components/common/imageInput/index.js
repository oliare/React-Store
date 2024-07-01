import React, { useState } from 'react';

const ImageInput = ({ label, field, type, defaultImg, newImg, onChange, error }) => {
    const [preview, setPreview] = useState(defaultImg);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onChange(file);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(defaultImg);
            onChange(null);
        }
    }

    if (newImg === defaultImg && preview !== defaultImg)
        setPreview(defaultImg);

    return (
        <>
            <div className="row d-flex justify-content-between">
                {preview && (
                    <div className="col-md-3 mb-3 text-center">
                        <div className="square-preview">
                            <img src={preview} alt="Preview" className="preview-image" style={{ maxHeight: "110px", maxWidth: "110px" }} />
                        </div>
                    </div>
                )}
                <div className="col-md-9 mb-3">
                    <label htmlFor={field} className="form-label">{label}</label>
                    <input type={type} id={field} name={field} onChange={handleFile}
                        className={`form-control ${error ? 'is-invalid' : ''}`} accept="image/*" />
                    {error && (<div className="invalid-feedback"> {error} </div>)}
                </div>
            </div>
        </>
    );
}

export default ImageInput;
