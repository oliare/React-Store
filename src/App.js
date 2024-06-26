import './App.css';
import Layout from './components/containers';
import HomePage from "./components/home";
import Accordion from "./components/accordion";
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './components/auth/register';
import NotFountPage from './components/home/pages/404';

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path={"register"} element={<RegisterPage />} />
                    <Route path={"*"} element={<NotFountPage />} />
                    {/* <Accordion /> */}
                </Route>
            </Routes>
        </>
    );
}

export default App;