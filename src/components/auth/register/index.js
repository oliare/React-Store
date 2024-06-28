import React, { useState } from 'react';
import ImageInput from "../../common/imageInput";
import TextInput from "../../common/input";
import TextArea from "../../common/textArea";
import defaultImg from "../../../assets/images/no_img.png";

const RegisterPage = () => {
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        console.clear();
        e.preventDefault();
        console.log('Full Name:', e.target.fullName.value);
        console.log('Phone:', e.target.phone.value);
        console.log('Email:', e.target.email.value);
        console.log('Hobby:', e.target.text.value);
        const img = e.target.image.files[0];
        if (img) {
            const imageUrl = URL.createObjectURL(img);
            console.log('Image', imageUrl);
        }
        setImage(defaultImg); 
        e.target.reset(); 
    };

    return (
        <>
            <h1 className="text-center mt-3">Registration</h1>
            <form className="col-md-6 offset-md-3 mt-5" onSubmit={handleSubmit}>
                <TextInput label="Full name" field="fullName" type="text" />

                <div className="row">
                    <div className="col-md-6">
                        <TextInput label="Phone" field="phone" type="text" />
                    </div>
                    <div className="col-md-6">
                        <TextInput label="Email" field="email" type="email" />
                    </div>
                </div>

                <TextArea label="Hobby" field="text" type="textarea" />
                <ImageInput label="Image" field="image" type="file" defaultImg={defaultImg} newImg={image} onImageChange={setImage} />

                <div className="row justify-content-center ">
                    <button type="submit" className="btn btn-primary btn-block col-md-2">Register</button>
                </div>
            </form>
        </>
    );
}

export default RegisterPage;
