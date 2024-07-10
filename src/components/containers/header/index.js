import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../../authContext"


const MainHeader = () => {
    const { isAuth, user, logout } = useContext(AuthContext)
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
                            </ul>

                            {isAuth ?
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/profile">{user.name}</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout" onClick={(e)=>
                                        {
                                            e.preventDefault();
                                            logout();
                                        }}>Logout</Link>
                                    </li>
                                </ul>
                                :
                                <ul className="navbar-nav ">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="#">Login</a>
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