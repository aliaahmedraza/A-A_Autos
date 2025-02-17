import { useState } from "react";
import { Modal } from "antd";
// import { useNavigate } from "react-router-dom";
import SignupPage from "../../../pages/SignUp/SignUp.jsx";
import "./SignUpModal.css";

const SignUpModal = () => {
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <button
        onClick={showModal}
        className="text-white bg-gradient-to-br from-[#252379] to-[#C92228] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-24"
      >
        SignUp
      </button> */}
      <button onClick={showModal} className="btn">
        SignUp
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>

      <Modal
        // title="SignUp"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <SignupPage onSignUpSuccess={handleOk} />
      </Modal>
    </div>
  );
};

export default SignUpModal;
