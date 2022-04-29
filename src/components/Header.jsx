import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Dogs } from "../assets/dogs.svg";
import Classes from "./Header.module.scss";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userData, userLogout } = React.useContext(UserContext);

  return (
    <div className={Classes.header}>
      <nav className={`container ${Classes.nav}`}>
        <Link to="/">
          <Dogs />{" "}
        </Link>
        {userData ? (
          <Link className={Classes.login} to="/user">
            {userData.nome}
            <button onClick={userLogout}>Log out</button>
          </Link>
        ) : (
          <Link className={Classes.login} to="/user">
            Login / Create account
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
