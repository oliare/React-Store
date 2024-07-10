import classNames from 'classnames';
import userImage from "../../../assets/images/no_img.png";
import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Modal from 'react-modal';
import { BsCrop, BsArrowRepeat } from 'react-icons/bs';

const ImageInput = ({ label, field, value, error, touched, onChange }) => {
    const [isCropping, setIsCropping] = useState(false);
    const [imageSrc, setImageSrc] = useState(value ? URL.createObjectURL(value) : userImage);
    const [originalImageFile, setOriginalImageFile] = useState(value || null);
    const cropperRef = useRef(null);

    const cropModal = () => {
        if (originalImageFile) {
            setIsCropping(true);
            setImageSrc(URL.createObjectURL(originalImageFile));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && isSupportedFileType(file.type)) {
            const reader = new FileReader();
            reader.onload = () => {
                const newSrc = reader.result;
                setImageSrc(newSrc);
                setOriginalImageFile(file);
                onChange({ target: { name: field, files: [file] } });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Unsupported file type :( ...');
            return;
        }
    };


    const handleCropImage = () => {
        if (cropperRef.current && cropperRef.current.cropper) {
            cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
                const file = new File([blob], "croppedImage.jpeg", { type: 'image/jpeg' });
                setImageSrc(URL.createObjectURL(file));
                onChange({ target: { name: field, files: [file] } });
                setIsCropping(false);
            });
        }
    };


    const handleRotation = () => {
        if (cropperRef.current && cropperRef.current.cropper) {
            cropperRef.current.cropper.rotate(90);
        }
    };

    const handleDone = () => {
        if (cropperRef.current && cropperRef.current.cropper) {
            cropperRef.current.cropper.getCroppedCanvas().toBlob((blob) => {
                const file = new File([blob], "cropped.jpeg", { type: 'image/jpeg' });
                setImageSrc(URL.createObjectURL(file));
                onChange({ target: { name: field, files: [file] } });
                setIsCropping(false);
            });
        }
    };

    const sprtdTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const isSupportedFileType = (fileType) => {
        return sprtdTypes.includes(fileType);
    };


    return (
        <>
            <div className="mb-3">
                <div className="row">
                    <div className="col-md-3" onClick={cropModal} style={{ cursor: originalImageFile ? 'pointer' : 'default' }}>
                        <img src={imageSrc} alt="avatar" className="img-fluid"
                            style={{ maxHeight: "110px", maxWidth: "110px", pointerEvents: originalImageFile ? 'auto' : 'none' }}
                        />
                    </div>
                    <div className="col-md-9">
                        <label htmlFor={field} className="form-label">{label}</label>
                        <input type="file" id={field} name={field} onChange={handleFileChange} aria-describedby="emailHelp"
                            className={classNames("form-control", { "is-invalid": error && touched })} accept="image/jpeg, image/png, image/gif" />
                        {(error && touched) && <div className="invalid-feedback">{error}</div>}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isCropping}
                onRequestClose={() => setIsCropping(false)}
                ariaHideApp={false}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    content: {
                        width: '300px',
                        height: '55%',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: '0%',
                        transform: 'translate(-50%, -50%)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    },
                }}>

                <div className='pt-4' style={{ width: '100%', height: 'auto', position: 'relative', overflow: 'hidden' }}>
                    <Cropper
                        ref={cropperRef}
                        src={imageSrc}
                        initialAspectRatio={1}
                        aspectRatio={1}
                        guides={true}
                        rotatable={true}
                        scalable={true}
                        zoomable={true}
                    />
                </div>

                <div className="text-center d-flex justify-content-around ">
                    <button className='btn' onClick={() => setIsCropping(false)}>
                        Cancel
                    </button>
                    <button className="btn" onClick={handleCropImage}>
                        <BsCrop />
                    </button>
                    <button className='btn' onClick={handleRotation}>
                        <BsArrowRepeat /> 90°
                    </button>
                    <button className='btn' onClick={handleDone}> Done</button>
                </div>
            </Modal>
        </>
    );
};

export default ImageInput;