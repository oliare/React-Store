import plusImage from "../../../assets/images/plus.jpg";
import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
import { useRef, useState } from "react";

const MultiFileInput = ({ label, field, value, error, onChange }) => {
    const [images, setImages] = useState([]);
    const [filesList, setFilesList] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const list = [...filesList, ...files];
        setFilesList(list);
        onChange(list);
        const imageFiles = files.map((file) => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imageFiles]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
        const updatedFilesList = filesList.filter((_, i) => i !== index);
        setFilesList(updatedFilesList);
        onChange(updatedFilesList);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedImages = Array.from(images);
        const [movedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, movedImage);

        const reorderedFiles = Array.from(filesList);
        const [movedFile] = reorderedFiles.splice(result.source.index, 1);
        reorderedFiles.splice(result.destination.index, 0, movedFile);

        setImages(reorderedImages);
        setFilesList(reorderedFiles);
        onChange(reorderedFiles);
    };

    return (
        <div className="mb-3">
            <div className="row">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="images" direction={"horizontal"}>
                        {(provided) => (
                            <div
                                className="row"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {images.map((image, index) => (
                                    <Draggable key={image} draggableId={image} index={index}>
                                        {(provided) => (
                                            <div
                                                className="col-md-3 image-preview"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <img src={image} className="img-fluid" alt={`Preview ${index}`} style={{ width: "80%", maxHeight: "120px" }} />
                                                <button onClick={() => removeImage(index)} className="remove-button">✖</button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                <div className="col-md-3">
                                    <label htmlFor={field} className="form-label">
                                        <img src={plusImage} alt="" className="img-fluid" style={{ maxHeight: "80px", maxWidth: "80px" }} />
                                    </label>
                                    <input type="file"
                                        className={classNames("d-none")}
                                        id={field}
                                        name={field}
                                        multiple={true}
                                        onChange={handleFileChange}
                                        aria-describedby="emailHelp" />
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
        </div>
    );
}

export default MultiFileInput;
