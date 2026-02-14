import { Link } from "react-router-dom";
import DI from "../../../di/DiModule";
import { useProfileStore } from "./ProfileSideMenuStore";

interface SideMenuProps {
  availableYears?: number[];
  selectedYear?: number | null;
  onYearSelect?: (year: number | null) => void;
}

const SideMenu = (props: SideMenuProps) => {
  const {} = useProfileStore();
  const { state } = DI.resolve("ProfileSideMenuController");
  const profile = state.profile;
  
  if (!profile) {
    return null;
  }
  
  return (
    <div className="side-menu">
      <Link to="/" className="side-menu-logo" aria-label="Home">
        <img src="/logo.png" alt="" className="side-menu-logo-img" />
      </Link>
      {profile.imageUrl && (
        <img
          src={profile.imageUrl}
          alt="Side menu"
          className="side-menu-image"
        />
      )}
      <h2 className="side-menu-message">{profile.title}</h2>
      <p className="side-menu-description">{profile.description}</p>
      {/* Blog Archive
      {props.availableYears && props.availableYears.length > 0 && (
        <div className="side-menu-years">
          <h3 className="side-menu-years-title">Blog Archieve</h3>
          <div className="side-menu-years-list">
            <button
              className={`side-menu-year-button ${
                props.selectedYear === null ? "active" : ""
              }`}
              onClick={() => props.onYearSelect?.(null)}
            >
              All
            </button>
            {props.availableYears.map((year) => (
              <button
                key={year}
                className={`side-menu-year-button ${
                  props.selectedYear === year ? "active" : ""
                }`}
                onClick={() => props.onYearSelect?.(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
      */}
    </div>
  );
};

export default SideMenu;
