import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import MainHeader from "./components/containers/header";
import HomePage from "./components/home";
import Accordion from "./components/accordion";

function App() {

    return (
        <>
            <MainHeader/>
            <HomePage/>
            <Accordion/>
        </>
    );
}

export default App;