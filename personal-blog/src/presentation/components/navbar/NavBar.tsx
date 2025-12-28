const NavBar = () => {
    return <nav className="navbar">
        <ul className="navbar-items">
            <li><a href="/">HOME</a></li>
            <li><a href="/favorites">FAVORITES</a></li>
            <li><a href="/gallery">GALLERY</a></li>
            <li><a href="/thoughts">THOUGHTS</a></li>
        </ul>
    </nav>;
}

export default NavBar;