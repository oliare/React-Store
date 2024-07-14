import { useContext } from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import { AuthContext } from "../../../authContext"


const MainHeader = () => {

    const { isAuth, user, logout } = useContext(AuthContext)

    const count = useSelector((state) => state.counter.value);
    const cart = useSelector((state) => state.products.carts);

    console.log("isAuth ", isAuth, user)
    return (
        <>
            <header data-bs-theme="dark">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/">Carousel</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/pizza/create">Add</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/novaPoshta">Nova poshta</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/counter">Redux</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/products">
                                        <i className="bi bi-cart"> </i>
                                        <span className="badge bg-danger">{cart}</span>
                                    </Link>
                                </li>
                            </ul>

                            {isAuth ?
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/profile">{user.name}</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout" onClick={(e) => {
                                            e.preventDefault();
                                            logout();
                                        }}>Logout</Link>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/login">Login {count}</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Signin</Link>
                                    </li>
                                </ul>
                            }

                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default MainHeader;