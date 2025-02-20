import { useState, useEffect } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../../pages/Login/Login.jsx";
import { useSelector, useDispatch } from "react-redux";
import { clearSignUpState } from "../../../Redus/UserSignUp/UserSignUpSlice.js";
import "./LoginModal.css";

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpMessage = useSelector((state) => state.signUpSuccess);

  useEffect(() => {
    if (signUpMessage === "User created successfully") {
      setOpen(true);
      console.log("Message", signUpMessage);
      dispatch(clearSignUpState());
    }
  }, [signUpMessage, dispatch]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={showModal} className="btn" id="login">
        Login
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>

      <Modal
        open={open}
        onCancel={handleCancel}
        footer={null}
        className="pl-20"
        destroyOnClose={true} 
      >
        <LoginPage onLoginSuccess={handleOk} />
      </Modal>
    </div>
  );
};

export default LoginModal;
