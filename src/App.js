import './App.css';
import Layout from './components/containers';
import HomePage from "./components/home";
// import Accordion from "./components/accordion";
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './components/auth/register';
import NotFountPage from "./components/pages/404";
import PizzaCreatePage from './components/pizza/create';

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path={"register"} element={<RegisterPage />} />
                    
                    <Route path={"pizza"}>
                        <Route path={"create"} element={<PizzaCreatePage />} />
                    </Route>

                    <Route path={"*"} element={<NotFountPage />} />
                    {/* <Accordion /> */}
                </Route>
            </Routes>
        </>
    );
}

export default App;