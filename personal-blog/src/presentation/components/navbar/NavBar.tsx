import { NavLink } from "react-router-dom";

const NavBar = () => {
    return <nav className="navbar">
        <ul className="navbar-items">
            <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined}>INÍCIO</NavLink></li>
            <li><NavLink to="/favorites" className={({ isActive }) => isActive ? "active" : undefined}>FAVORITOS</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => isActive ? "active" : undefined}>GALERIA</NavLink></li>
            <li><NavLink to="/thoughts" className={({ isActive }) => isActive ? "active" : undefined}>PENSAMENTOS</NavLink></li>
        </ul>
    </nav>;
}

export default NavBar;