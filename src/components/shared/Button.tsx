import PropTypes from "prop-types";
interface Props {
  children: any;
  version: string;
  type: "submit" | "reset" | "button" | undefined;
  isDisabled: boolean;
}

function Button({ children, version, type, isDisabled }: Props) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default Button;
