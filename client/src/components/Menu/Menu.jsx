// // import { useState } from "react";
// // import {
// //   AppstoreOutlined,
// //   ContainerOutlined,
// //   LogoutOutlined,
// //   MailOutlined,
// //   MenuFoldOutlined,
// //   MenuUnfoldOutlined,
// //   UserOutlined,
// // } from "@ant-design/icons";
// // import { Button, Menu } from "antd";
// // import { useNavigate } from "react-router-dom";
// // import LogoutModal from "../Modals/LogoutModal/LogoutModal";

// // const items = [
// //   {
// //     key: "1",
// //     icon: <UserOutlined />,
// //     label: "Update Profile",
// //   },
// //   {
// //     key: "2",
// //     icon: <LogoutOutlined />,
// //     label: "LogOut",
// //   },
// //   {
// //     key: "3",
// //     icon: <ContainerOutlined />,
// //     label: "Option 3",
// //   },
// //   {
// //     key: "sub1",
// //     label: "Navigation One",
// //     icon: <MailOutlined />,
// //     children: [
// //       { key: "5", label: "Option 5" },
// //       { key: "6", label: "Option 6" },
// //       { key: "7", label: "Option 7" },
// //       { key: "8", label: "Option 8" },
// //     ],
// //   },
// //   {
// //     key: "sub2",
// //     label: "Navigation Two",
// //     icon: <AppstoreOutlined />,
// //     children: [
// //       { key: "9", label: "Option 9" },
// //       { key: "10", label: "Option 10" },
// //       {
// //         key: "sub3",
// //         label: "Submenu",
// //         children: [
// //           { key: "11", label: "Option 11" },
// //           { key: "12", label: "Option 12" },
// //         ],
// //       },
// //     ],
// //   },
// // ];

// // const MenuOption = () => {
// //   const [collapsed, setCollapsed] = useState(true);
// //   const [isModalVisible, setIsModalVisible] = useState(false);
// //   const navigate = useNavigate();

// //   const toggleCollapsed = () => {
// //     setCollapsed(!collapsed);
// //   };

// //   const handleClick = (e) => {
// //     if (e.key === "1") {
// //       navigate("/update");
// //     } else if (e.key === "2") {
// //       setIsModalVisible(true); // Show modal on LogOut click
// //     }
// //   };

// //   return (
// //     <div className="w-48 h-screen">
// //       <Button
// //         type="text"
// //         onClick={toggleCollapsed}
// //         // style={{ marginBottom: 16 }}
// //         className="w-20 h-10 mb-2 bg-[#FFFFFF]"
// //       >
// //         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
// //       </Button>
// //       <Menu
// //         defaultSelectedKeys={["1"]}
// //         mode="inline"
// //         theme="dark"
// //         inlineCollapsed={collapsed}
// //         items={items}
// //         onClick={handleClick}
// //         className="h-full"
// //       />
// //       <LogoutModal open={isModalVisible} setOpen={setIsModalVisible} />
// //     </div>
// //   );
// // };

// // export default MenuOption;

// import React from "react";
// import {
//   IconButton,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
//   Accordion,
//   AccordionHeader,
//   AccordionBody,
//   // Alert,
//   // Input,
//   Drawer,
//   Card,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
// } from "@heroicons/react/24/solid";
// import {
//   ChevronRightIcon,
//   ChevronDownIcon,
//   // CubeTransparentIcon,
//   // MagnifyingGlassIcon,
//   Bars3Icon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import LogoutModal from "../Modals/LogoutModal/LogoutModal";

// export function SidebarWithBurgerMenu() {
//   const [open, setOpen] = React.useState(0);
//   // const [openAlert, setOpenAlert] = React.useState(true);
//   const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
//     const [isModalOpen, setIsModalOpen] = React.useState(false);

//     const openModal = () => setIsModalOpen(true);
//     const closeModal = () => setIsModalOpen(false);

//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);
//   };

//   const openDrawer = () => setIsDrawerOpen(true);
//   const closeDrawer = () => setIsDrawerOpen(false);

//   return (
//     <>
//       <IconButton variant="text" size="lg" onClick={openDrawer}>
//         {isDrawerOpen ? (
//           <XMarkIcon className="h-8 w-8 stroke-2" />
//         ) : (
//           <Bars3Icon className="h-8 w-8 stroke-2" />
//         )}
//       </IconButton>
//       <Drawer
//         open={isDrawerOpen}
//         onClose={closeDrawer}
//         overlay={false} // This will remove the overlay entirely
//         className="bg-white" // Optional, ensures drawer is visible [#252379]
//       >
//         <Card
//           color="transparent"
//           shadow={false}
//           className="h-[calc(100vh-2rem)] w-full p-4"
//         >
//           <div className="mb-2 flex items-center gap-4 p-4">
//             {/* <img
//               src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
//               alt="brand"
//               className="h-8 w-8"
//             /> */}
//             <Typography variant="h5" color="blue-gray">
//               Sidebar
//             </Typography>
//           </div>
//           {/* <div className="p-2">
//             <Input
//               icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//               label="Search"
//             />
//           </div> */}
//           <List>
//             <Accordion
//               open={open === 1}
//               icon={
//                 <ChevronDownIcon
//                   strokeWidth={2.5}
//                   className={`mx-auto h-4 w-4 transition-transform ${
//                     open === 1 ? "rotate-180" : ""
//                   }`}
//                 />
//               }
//             >
//               <ListItem className="p-0" selected={open === 1}>
//                 <AccordionHeader
//                   onClick={() => handleOpen(1)}
//                   className="border-b-0 p-3"
//                 >
//                   <ListItemPrefix>
//                     <PresentationChartBarIcon className="h-5 w-5" />
//                   </ListItemPrefix>
//                   <Typography color="blue-gray" className="mr-auto font-normal">
//                     Dashboard
//                   </Typography>
//                 </AccordionHeader>
//               </ListItem>
//               <AccordionBody className="py-1">
//                 <List className="p-0">
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Analytics
//                   </ListItem>
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Reporting
//                   </ListItem>
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Projects
//                   </ListItem>
//                 </List>
//               </AccordionBody>
//             </Accordion>
//             <Accordion
//               open={open === 2}
//               icon={
//                 <ChevronDownIcon
//                   strokeWidth={2.5}
//                   className={`mx-auto h-4 w-4 transition-transform ${
//                     open === 2 ? "rotate-180" : ""
//                   }`}
//                 />
//               }
//             >
//               <ListItem className="p-0" selected={open === 2}>
//                 <AccordionHeader
//                   onClick={() => handleOpen(2)}
//                   className="border-b-0 p-3"
//                 >
//                   <ListItemPrefix>
//                     <ShoppingBagIcon className="h-5 w-5" />
//                   </ListItemPrefix>
//                   <Typography color="blue-gray" className="mr-auto font-normal">
//                     E-Commerce
//                   </Typography>
//                 </AccordionHeader>
//               </ListItem>
//               <AccordionBody className="py-1">
//                 <List className="p-0">
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Orders
//                   </ListItem>
//                   <ListItem>
//                     <ListItemPrefix>
//                       <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
//                     </ListItemPrefix>
//                     Products
//                   </ListItem>
//                 </List>
//               </AccordionBody>
//             </Accordion>
//             <hr className="my-2 border-blue-gray-50" />
//             <ListItem>
//               <ListItemPrefix>
//                 <InboxIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Inbox
//               <ListItemSuffix>
//                 <Chip
//                   value="14"
//                   size="sm"
//                   variant="ghost"
//                   color="blue-gray"
//                   className="rounded-full"
//                 />
//               </ListItemSuffix>
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <UserCircleIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Profile
//             </ListItem>
//             <ListItem>
//               <ListItemPrefix>
//                 <Cog6ToothIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Settings
//             </ListItem>
//             <>
//               <ListItem onClick={openModal} className="cursor-pointer">
//                 <ListItemPrefix>
//                   <PowerIcon className="h-5 w-5" />
//                 </ListItemPrefix>
//                 Log Out
//               </ListItem>

//               {/* Render the modal conditionally */}
//               {isModalOpen && <LogoutModal onClose={closeModal} />}
//             </>
//             {/* <ListItem onClick={<LogoutModal/>}>
//               <ListItemPrefix>
//                 <PowerIcon className="h-5 w-5" />
//               </ListItemPrefix>
//               Log Out
//             </ListItem> */}
//           </List>
//           {/* <Alert
//             open={openAlert}
//             className="mt-auto"
//             onClose={() => setOpenAlert(false)}
//           >
//             <CubeTransparentIcon className="mb-4 h-12 w-12" />
//             <Typography variant="h6" className="mb-1">
//               Upgrade to PRO
//             </Typography>
//             <Typography variant="small" className="font-normal opacity-80">
//               Upgrade to Material Tailwind PRO and get even more components,
//               plugins, advanced features and premium.
//             </Typography>
//             <div className="mt-4 flex gap-3">
//               <Typography
//                 as="a"
//                 href="#"
//                 variant="small"
//                 className="font-medium opacity-80"
//                 onClick={() => setOpenAlert(false)}
//               >
//                 Dismiss
//               </Typography>
//               <Typography
//                 as="a"
//                 href="#"
//                 variant="small"
//                 className="font-medium"
//               >
//                 Upgrade Now
//               </Typography>
//             </div>
//           </Alert> */}
//         </Card>
//       </Drawer>
//     </>
//   );
// }
import React, { useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PowerIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoutModal from "../Modals/LogoutModal/LogoutModal";

export function SidebarWithBurgerMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>

      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        overlay={false}
        className="bg-white"
      >
        <Card className="h-[calc(100vh-2rem)] w-full p-4" shadow={false}>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Sidebar
          </Typography>

          <List>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>

            <ListItem
              onClick={openModal}
              className="cursor-pointer hover:bg-gray-100"
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-red-600" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>

      {/* Logout Modal */}
      <LogoutModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
}
