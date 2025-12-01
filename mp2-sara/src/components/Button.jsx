import "./styles/Button.css";

export default function Button({ onClick, text, icon: Icon, className }) {
  return (
    <button className={`custom-button ${className || ""}`} onClick={onClick}>
      {Icon && <Icon className="button-icon" />}
      {text && <span>{text}</span>}
    </button>
  );
}
