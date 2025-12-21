interface SideMenuProps {
  imageUrl?: string;
  message: string;
  description: string;
}

const SideMenu = (props: SideMenuProps) => {
  return (
    <div className="side-menu">
      {props.imageUrl && (
        <img src={props.imageUrl} alt="Side menu" className="side-menu-image" />
      )}
      <h2 className="side-menu-message">{props.message}</h2>
      <p className="side-menu-description">{props.description}</p>
    </div>
  );
};

export default SideMenu;
