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
      {/* <button
        className="button"
        // className="text-white bg-gradient-to-br from-[#252379] to-[#C92228] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-24"
      >
        LogIn
      </button> */}
      <button onClick={showModal} className="btn" id="login">
        Login
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>

      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="pl-20"
      >
        <LoginPage onLoginSuccess={handleOk} />
      </Modal>
    </div>
  );
};

export default LoginModal;
