import { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../Modals/LogoutModal/LogoutModal";

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Update Profile",
  },
  {
    key: "2",
    icon: <LogoutOutlined />,
    label: "LogOut",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Option 3",
  },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" },
        ],
      },
    ],
  },
];

const MenuOption = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) => {
    if (e.key === "1") {
      navigate("/update");
    } else if (e.key === "2") {
      setIsModalVisible(true); // Show modal on LogOut click
    }
  };

  return (
    <div className="w-48 h-screen">
      <Button
        type="text"
        onClick={toggleCollapsed}
        // style={{ marginBottom: 16 }}
        className="w-20 h-10 mb-2 bg-[#FFFFFF]"
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleClick}
        className="h-full"
      />
      <LogoutModal open={isModalVisible} setOpen={setIsModalVisible} />
    </div>
  );
};

export default MenuOption;
