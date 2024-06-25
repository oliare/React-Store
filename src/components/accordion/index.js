import React, { useState } from "react";
import { VscAdd } from "react-icons/vsc";
import "./accordion.css";

const Accordion = () => {
    const [item, setItem] = useState();

    const list = [
        {
            title: "What is Lorem Ipsum?",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            title: "Why do we use it?",
            content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
        },
        {
            title: "Where can I get some?",
            content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
        },
        {
            title: "Where does it come from?",
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
        },
    ];

    const handleAccordion = index => {
        setItem(index == item ? undefined : index);
    };

    return (
        <div className="container accordion">
            {list.map((i, index) => (
                <div className="accordion-item" key={index}>
                    <div className="accordion-title" onClick={() => handleAccordion(index)}>{i.title}
                        <VscAdd className={`accordion-icon ${item == index ? 'rotate' : ''}`} />
                    </div>
                    {item == index && (
                        <div className="accordion-content">{i.content}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
