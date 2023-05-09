// == Import : package
import { Link } from "react-router-dom";

// == Import : style
import "./header.scss";

const Header = () => (
    <header className="header">
        <Link to={"/"}>
            <h1 className="header_title">Ma TodoList</h1>
        </Link>
    </header>
);

export default Header;
