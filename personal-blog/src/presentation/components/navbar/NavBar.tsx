import { NavLink } from "react-router-dom";

const NavBar = () => {
    return <nav className="navbar">
        <ul className="navbar-items">
            <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined}>HOME</NavLink></li>
            <li><NavLink to="/favorites" className={({ isActive }) => isActive ? "active" : undefined}>FAVORITES</NavLink></li>
            <li><NavLink to="/gallery" className={({ isActive }) => isActive ? "active" : undefined}>GALLERY</NavLink></li>
            <li><NavLink to="/thoughts" className={({ isActive }) => isActive ? "active" : undefined}>THOUGHTS</NavLink></li>
        </ul>
    </nav>;
}

export default NavBar;