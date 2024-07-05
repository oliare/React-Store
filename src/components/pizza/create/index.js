
import * as yup from "yup";
import { useFormik } from "formik";
import TextInput from "../../common/input";
import MultiFileInput from "../../common/multiFileInput";

const PizzaCreatePage = () => {

    const initValue = {
        name: "",
        description: "",
        images: []
    };

    const registerSchema = yup.object({
        name: yup.string()
            .required("Enter a name"),
        description: yup.string()
            .required("Enter a description"),
        images: yup.mixed()
            .required('Image is required')
            .test(
                'fileType',
                'Invalid file type',
                value => value && ['image/jpeg', 'image/png', 'image/webp'].includes(value?.type)
            ),
    });

    const handleFormikSubmit = (values) => {
        //e.preventDefault();
        console.log("Submit form ", values);
    }

    const formik = useFormik({
        initialValues: initValue,
        onSubmit: handleFormikSubmit,
        validationSchema: registerSchema
    });

    const { values, errors, handleSubmit, handleChange } = formik;

    const onChangeFileHandler = (files) => {
        console.log("onChange", files);
        // const file = e.target.files[0];
        // if (file) {
        //     setFieldValue(e.target.name, file);
        //     //setData({...data, [e.target.name]: file});
        // }
        // else {
        //     setFieldValue(e.target.name, null);
        //     //setData({...data, [e.target.name]: null});
        //     //alert("Оберіть фото");
        // }
    }

    console.log("errors ", errors);
    return (
        <>
            <h1 className={"text-center mt-3"}>Add pizza</h1>
            <form onSubmit={handleSubmit} className={"col-md-6 offset-md-3 mt-5"}>
                <TextInput label={"Name"} field={"name"} type={"text"} value={values.name} error={errors.name}
                    onChange={handleChange} />

                <TextInput label={"Description"} field={"description"} type={"text"} value={values.description}
                    error={errors.description} onChange={handleChange} />

                <MultiFileInput label={"Image"} field={"image"} value={values.image} error={errors.image}
                    onChange={onChangeFileHandler} />

                <button type="submit" className="btn btn-primary">Створити</button>

            </form>
        </>
    )
}

export default PizzaCreatePage;
