import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();
    
    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    return <nav className="navbar">
        <ul className="navbar-items">
            <li><Link to="/" className={isActive("/") ? "active" : ""}>HOME</Link></li>
            <li><Link to="/favorites" className={isActive("/favorites") ? "active" : ""}>FAVORITES</Link></li>
            <li><Link to="/gallery" className={isActive("/gallery") ? "active" : ""}>GALLERY</Link></li>
            <li><Link to="/thoughts" className={isActive("/thoughts") ? "active" : ""}>THOUGHTS</Link></li>
        </ul>
    </nav>;
}

export default NavBar;