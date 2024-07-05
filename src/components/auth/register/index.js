import ImageInput from "../../common/imageInput";
import TextInput from "../../common/input";
import TextArea from "../../common/textArea";
import * as yup from 'yup';
import classNames from 'classnames';
import { useFormik } from 'formik';

const RegisterPage = () => {

    const initValue = {
        fullName: "",
        phone: "",
        email: "",
        password: "",
        hobby: "",
        birthday: "",
        image: null
    };

    const registerSchema = yup.object().shape({
        fullName: yup.string().required("Full name is required"),
        phone: yup.string().required("Phone number is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
        hobby: yup.string().required("Please describe your hobby"),
        birthday: yup.date()
            .transform((value, date) => date === '' ? null : value)
            .required("Birthday is required"),
        image: yup.mixed()
            .required('Picture is required')
            .test(
                'fileType',
                'Invalid format',
                value => value && ['image/jpeg', 'image/png', 'image/webp'].includes(value?.type)
            ),
    });

    const handleFormikSubmit = (values) => {
        console.log("Submit form ", values);
    }

    const formik = useFormik({
        initialValues: initValue,
        onSubmit: handleFormikSubmit,
        validationSchema: registerSchema
    });

    const { values, errors, handleSubmit, handleChange, setFieldValue } = formik;

    const onChangeFileHandler = (e) => {
        console.log("onChange", e.target.files);
        const file = e.target.files[0];
        if (file)
            setFieldValue(e.target.name, file);
        else
            setFieldValue(e.target.name, null);
    }
    console.log("errors ", errors);

    return (
        <>
            <h1 className="text-center mt-3">Registration</h1>
            <form className="col-md-6 offset-md-3 mt-5" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <TextInput label="Full name" field="fullName" type="text" onChange={handleChange} value={values.fullName} error={errors.fullName} />
                    </div>
                    <div className="col-md-6">
                        <TextInput label="Email" field="email" type="email" onChange={handleChange} value={values.email} error={errors.email} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <TextInput label="Phone" field="phone" type="text" onChange={handleChange} value={values.phone} error={errors.phone} />
                    </div>
                    <div className="col-md-6">
                        <TextInput label="Birthday" field="birthday" type="date" onChange={handleChange} value={values.birthday} error={errors.birthday} />
                    </div>
                </div>

                <TextArea label="Hobby" field="hobby" type="textarea" onChange={handleChange} value={values.hobby}
                    error={errors.hobby} className={classNames('form-control', { 'is-invalid': errors.hobby })} />

                <ImageInput label="Image" field="image" type="file" onChange={onChangeFileHandler} value={values.image} error={errors.image} />
                <TextInput label="Password" field="password" type="password" onChange={handleChange} value={values.password} error={errors.password} />

                <div className="row justify-content-center mb-4">
                    <button type="submit" className="btn btn-primary btn-block col-md-2">Register</button>
                </div>
            </form>
        </>
    );
}

export default RegisterPage;
