import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authContex = useContext(AuthContext);
  const isLoggedIn = authContex.isLoggedIn;
  const history = useHistory();

  const logoutHandler = () => {
    authContex.logout();
    history.replace("/");
  };

  useEffect(() => {
    if (!authContex.login) {
      return;
    }
    setTimeout(() => {
      authContex.logout();
    }, 1 * 5 * 60 * 1000);
  }, [authContex]);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
