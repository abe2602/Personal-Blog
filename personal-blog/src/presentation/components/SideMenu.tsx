interface SideMenuProps {
  imageUrl?: string;
  message: string;
  description: string;
  availableYears?: number[];
  selectedYear?: number | null;
  onYearSelect?: (year: number | null) => void;
}

const SideMenu = (props: SideMenuProps) => {
  return (
    <div className="side-menu">
      {props.imageUrl && (
        <img src={props.imageUrl} alt="Side menu" className="side-menu-image" />
      )}
      <h2 className="side-menu-message">{props.message}</h2>
      <p className="side-menu-description">{props.description}</p>
      {props.availableYears && props.availableYears.length > 0 && (
        <div className="side-menu-years">
          <h3 className="side-menu-years-title">Blog Archieve</h3>
          <div className="side-menu-years-list">
            <button
              className={`side-menu-year-button ${props.selectedYear === null ? 'active' : ''}`}
              onClick={() => props.onYearSelect?.(null)}
            >
              All
            </button>
            {props.availableYears.map((year) => (
              <button
                key={year}
                className={`side-menu-year-button ${props.selectedYear === year ? 'active' : ''}`}
                onClick={() => props.onYearSelect?.(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
