import { NavLink } from "react-router-dom";
import "./styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <h1>Galeria de Animais 🐾</h1>
      <nav>
        <NavLink to="/gallery" className={({ isActive }) => isActive ? "active" : ""}>
          Galeria
        </NavLink>
        <NavLink to="/breeds" className={({ isActive }) => isActive ? "active" : ""}>
          Raças
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => isActive ? "active" : ""}>
          Favoritos
        </NavLink>
        <NavLink to="/foods" className={({ isActive }) => isActive ? "active" : ""}>
          Rações
        </NavLink>
      </nav>
    </header>
  );
}
