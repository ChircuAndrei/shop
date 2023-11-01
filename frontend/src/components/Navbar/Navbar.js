import { Home} from "./Home";
import {Login} from "./Login";
import { Cart } from "./Cart"

export const Navbar = ({ input, search, handleKeyPress }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light-emphasis">
        <div className="container-fluid d-flex align-items-center">
            <Home />
            <Cart />
            <Login />
        </div>
    </nav>
);
