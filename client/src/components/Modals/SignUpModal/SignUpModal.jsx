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
      <button onClick={showModal} className="btn ml-8">
        SignUp
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>

      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <SignupPage onSignUpSuccess={handleOk} />
      </Modal>
    </div>
  );
};

export default SignUpModal;
