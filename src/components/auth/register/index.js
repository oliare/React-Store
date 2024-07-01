import React, { useState } from 'react';
import ImageInput from "../../common/imageInput";
import TextInput from "../../common/input";
import TextArea from "../../common/textArea";
import defaultImg from "../../../assets/images/no_img.png";
import * as yup from 'yup';
import classNames from 'classnames';

const RegisterPage = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        fullName: "",
        phone: "",
        email: "",
        hobby: "",
        birthday: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const validationSchema = yup.object().shape({
        fullName: yup.string().required("Full name is required"),
        phone: yup.string().required("Phone number is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
        hobby: yup.string().required("Please describe your hobby"),
        birthday: yup.date()
            .transform((value, date) => date === '' ? null : value)
            .required("Birthday is required"),
        image: yup.mixed().required("Image is required"),
    });

    const onChangeHandler = (e) => {
        console.log(`${e.target.name}: ${e.target.value}`);
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        return validationSchema.validate(data, { abortEarly: false })
            .then(() => {
                setErrors({});
                return true;
            })
            .catch(err => {
                const errors = err.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(errors);
                return false;
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (isValid) {
            const img = e.target.image.files[0];
            if (img) {
                const imageUrl = URL.createObjectURL(img);
                console.log('Image', imageUrl);
                setImage(imageUrl);
            }
            setData({
                fullName: "",
                phone: "",
                email: "",
                hobby: "",
                birthday: "",
                password: "",
            });
        }
    };
    return (
        <>
            <h1 className="text-center mt-3">Registration</h1>
            <form className="col-md-6 offset-md-3 mt-5" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <TextInput label="Full name" field="fullName" type="text" onChange={onChangeHandler} value={data.fullName} error={errors.fullName}
                            className={classNames('form-control', { 'is-invalid': errors.fullName })} />
                    </div>
                    <div className="col-md-6">
                        <TextInput label="Email" field="email" type="email" onChange={onChangeHandler} value={data.email} error={errors.email}
                            className={classNames('form-control', { 'is-invalid': errors.email })} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <TextInput label="Phone" field="phone" type="text" onChange={onChangeHandler} value={data.phone} error={errors.phone}
                            className={classNames('form-control', { 'is-invalid': errors.phone })} />
                    </div>
                    <div className="col-md-6">
                        <TextInput label="Birthday" field="birthday" type="date" onChange={onChangeHandler} value={data.birthday} error={errors.birthday}
                            className={classNames('form-control', { 'is-invalid': errors.birthday })} />
                    </div>
                </div>

                <TextArea label="Hobby" field="hobby" type="textarea" onChange={onChangeHandler} value={data.hobby} error={errors.hobby}
                    className={classNames('form-control', { 'is-invalid': errors.hobby })} />

                <ImageInput label="Image" field="image" type="file" defaultImg={defaultImg} newImg={image} onChange={setImage} error={errors.image}
                    className={classNames('form-control', { 'is-invalid': errors.image })} />

                <TextInput label="Password" field="password" type="password" onChange={onChangeHandler} value={data.password} error={errors.password}
                    className={classNames('form-control', { 'is-invalid': errors.password })} />

                <div className="row justify-content-center mb-4">
                    <button type="submit" className="btn btn-primary btn-block col-md-2">Register</button>
                </div>
            </form>
        </>
    );
}

export default RegisterPage;
