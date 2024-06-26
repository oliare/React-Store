import TextInput from "../../common/input";

const RegisterPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit')
    }
    return (
        <>
            <h1 className={"text-center mt-3"}>Registration</h1>
            <form className={"col-md-6 offset-md-3 mt-5"} onSubmit={handleSubmit}>

                <TextInput label={"First Name"} field={"firstName"} type={"text"} />
                <TextInput label={"Last Name"} field={"lastName"} type={"text"} />
                <TextInput label={"Phone"} field={"phone"} type={"text"} />

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </>
    )
}

export default RegisterPage;