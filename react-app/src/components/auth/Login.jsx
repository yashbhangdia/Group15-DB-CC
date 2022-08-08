import React from "react";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "../../base/hooks";
import { DASHBOARD } from "../../config/routeUrls";
import * as authService from "../../services/authService";
import StandardButton from "../shared/forms/StandardButton/StandardButton";

const Login = () => {
  const navigate = useNavigate();

  const [btnDisabled, setBtnDisabled] = useBoolean(false);

  const login = async () => {
    try {
      setBtnDisabled.on();
      await authService.login();
      navigate(DASHBOARD);
    } catch (e) {
    } finally {
      setBtnDisabled.off();
    }
  };

  return (
    <div>
      <StandardButton
        color="btn-primary"
        onClick={login}
        text="Login"
        disabled={btnDisabled}
      />
    </div>
  );
};

export default Login;
