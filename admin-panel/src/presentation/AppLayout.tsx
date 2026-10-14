import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="main-container">
      <nav className="app-tabs" aria-label="Main">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `app-tab ${isActive ? "app-tab--active" : ""}`
          }
        >
          Compose
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            `app-tab ${isActive ? "app-tab--active" : ""}`
          }
        >
          All Posts
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
