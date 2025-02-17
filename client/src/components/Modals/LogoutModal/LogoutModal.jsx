import React from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LogoutModal = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleOk = () => {
    setOpen(false);
    localStorage.removeItem("token");
    Cookies.remove("token");
    navigate("/");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Confirmation"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are you sure you want to log out?</p>
    </Modal>
  );
};

export default LogoutModal;
