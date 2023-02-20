import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef = useRef("");
  const authCotx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBlvwm2UFysqlxp549MzHN_mTVXIn57d7s",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCotx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace("/");
    });
    newPasswordInputRef.current.value = "";
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
