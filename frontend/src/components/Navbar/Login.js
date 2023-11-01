export const Login = () => (
    <div className="dropdown mx-4">
        <button
            className="dropdown-toggle d-flex align-items-center hidden-arrow"
            id="navbarDropdownMenuAvatar"
            type="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false">
            <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
            />
        </button>
        <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar">
            <li>
                <a className="dropdown-item">My profile</a>
            </li>
            <li>
                <a className="dropdown-item">Settings</a>
            </li>
            <li>
                <a className="dropdown-item">Logout</a>
            </li>
        </ul>
    </div>
);
