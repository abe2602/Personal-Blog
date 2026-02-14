import { Link } from "react-router-dom";

/**
 * Logo shown above the search bar when the profile sidebar is hidden (e.g. on small screens).
 * Hidden on large screens where the sidebar with logo is visible.
 */
const LogoWhenSidebarHidden = () => {
  return (
    <Link
      to="/"
      className="logo-when-sidebar-hidden"
      aria-label="Home"
    >
      <img src="/logo.png" alt="" className="logo-when-sidebar-hidden-img" />
    </Link>
  );
};

export default LogoWhenSidebarHidden;
