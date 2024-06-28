import React, { useState } from 'react';

const ImageInput = ({ label, field, type, defaultImg, newImg, onImageChange }) => {
    const [preview, setPreview] = useState(defaultImg);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageChange(file);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(defaultImg);
            onImageChange(null);
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
                    <input type={type} id={field} name={field} className="form-control" accept="image/*" onChange={handleFile} />
                </div>
            </div>
        </>
    );
}

export default ImageInput;