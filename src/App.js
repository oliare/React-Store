import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import MainHeader from "./components/containers/header";
import HomePage from "./components/home";

function App() {



    return (
        <>
            <MainHeader/>

            <HomePage/>
        </>
    );
}

export default App;