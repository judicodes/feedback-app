import PropTypes from "prop-types";

interface Props {
  bgColor: string;
  textColor: string;
  text: string;
}

function Header({ text, bgColor, textColor }: Props) {
  const headerStyles = { backgroundColor: bgColor, color: textColor };

  return (
    <header style={headerStyles}>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
}

Header.defaultProps = {
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
  text: "Feedback UI"
};

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string
};

export default Header;
