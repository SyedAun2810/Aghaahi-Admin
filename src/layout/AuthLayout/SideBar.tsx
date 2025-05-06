import DarkLogo from "@Assets/icons/darkLogo.svg";
import Logo from "@Assets/images/logo.png";
import PaymentIcon from "@Assets/icons/paymentDetailsIcon.svg";
import UserIcon from "@Assets/icons/userIcon.svg";
import DashboardIcon from "@Assets/icons/sellerDashboardIcon.svg";
import CustomModal from "@Components/CustomModal/CustomModal";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import PaymentDetailsPassword from "@Pages/AppScreens/PaymentDetails/PasswordModal/PaymentDetailsAccess";
import { ModalMethodsTypes } from "@Utils/types";
import { Menu, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthLayoutContainer } from "./useAuthLayoutContainer";
import useAuthStore from "@Store/authStore";

const SideBar = () => {
    const { route, selectedKey, navigate } = useAuthLayoutContainer();
    const { removeUserAuthentication, userData } = useAuthStore();

    const role = userData?.role || 2;
    const handleLogout = () => {
        removeUserAuthentication(); 
        navigate(NavigationRoutes.AUTH_ROUTES.LOGIN);
    };

    const modalRef = useRef<ModalMethodsTypes | null>(null);
    const sidebarMenu = [
        ...(role === 1
            ? [
                  {
                      key: "admin-management",
                      label: (
                          <Link to={NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT}>
                              Admin Management
                          </Link>
                      ),
                      icon: <UserIcon />
                  },
                  {
                      key: "upsert-admin",
                      label: (
                          <Link to={`${NavigationRoutes.DASHBOARD_ROUTES.UPSERT_ADMIN}`}>
                              Create Admin
                          </Link>
                      ),
                      icon: <UserIcon />
                  }
              ]
            : []),
        {
            key: "company-management",
            label: (
                <Link to={NavigationRoutes.DASHBOARD_ROUTES.COMPANY_LISTING}>
                    Company Management
                </Link>
            ),
            icon: <DashboardIcon />
        },
        {
            key: "employee-management",
            label: (
                <Link to={`${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_MANAGEMENT}/3`}>
                    Company Users
                </Link>
            ),
            icon: <UserIcon />
        },
        {
            key: "edit-profile",
            label: (
                <Link to={`${NavigationRoutes.DASHBOARD_ROUTES.EDIT_PROFILE}`}>
                    My Profile
                </Link>
            ),
            icon: <UserIcon />
        }
    ];

    const customSiderClass =
        selectedKey === "banner-ad-management" ? " change-svg custom-sidebar" : "custom-sidebar";

    return (
        <div className="">
            <Sider
                width={252}
                breakpoint="lg"
                collapsedWidth="0"
                className={` bg-white ${customSiderClass} h-[100vh] flex flex-col justify-between relative`}
            >
                <div>
                    <div className="logo cursor-pointer">
                        <img
                            src={Logo}
                            className="text-main-orange h-36 w-36"
                            onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT)}
                        />
                    </div>
                    <Menu
                        mode="inline"
                        items={sidebarMenu.map((item) => ({
                            key: item.key,
                            icon: item.icon,
                            label: item.label
                        }))}
                        selectedKeys={route.length ? selectedKey : "dashboard"}
                    />
                </div>
                <div className="p-4 absolute bottom-0 w-full">
                    <Button type="primary" danger block onClick={handleLogout}>
                        Logout
                    </Button
                </div>
            </Sider>
            <CustomModal ref={modalRef}>
                <PaymentDetailsPassword
                    onFinish={() => {
                        navigate(NavigationRoutes.DASHBOARD_ROUTES.PAYMENT_DETAILS, {
                            state: { isAuthenticated: true }
                        });
                        modalRef?.current?.closeModal();
                    }}
                />
            </CustomModal>
        </div>
    );
};

export default SideBar;
