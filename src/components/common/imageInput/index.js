import userImage from "../../../assets/images/no_img.png";
import classNames from "classnames";

const ImageInput = ({ label, field, value, error, onChange }) => {
    const img = value == null ? userImage : URL.createObjectURL(value);
    console.log("error", error);
    return (
        <>
            <div className="mb-3">
                <div className="row">
                    <div className="col-md-3">
                        <img src={img} alt="" className={"img-fluid"} style={{ maxHeight: "110px", maxWidth: "110px" }} />
                    </div>
                    <div className="col-md-9">
                        <label htmlFor={field} className="form-label">{label}</label>
                        <input type="file" id={field} name={field} onChange={onChange} aria-describedby="emailHelp"
                            className={classNames("form-control", {
                                "is-invalid": error
                            })} />
                        {error &&
                            <div className="invalid-feedback">
                                {error}
                            </div>
                        }
                    </div>
                </div>

            </div>

        </>
    );
}


export default ImageInput;