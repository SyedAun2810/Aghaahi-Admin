import DarkLogo from "@Assets/icons/darkLogo.svg";
import Logo  from "@Assets/images/logo.png";
import PaymentIcon from "@Assets/icons/paymentDetailsIcon.svg";
import UserIcon from "@Assets/icons/userIcon.svg";
import CustomModal from "@Components/CustomModal/CustomModal";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import PaymentDetailsPassword from "@Pages/AppScreens/PaymentDetails/PasswordModal/PaymentDetailsAccess";
import { ModalMethodsTypes } from "@Utils/types";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthLayoutContainer } from "./useAuthLayoutContainer";

const SideBar = () => {
    const { route, selectedKey, navigate } = useAuthLayoutContainer();

    const modalRef = useRef<ModalMethodsTypes | null>(null);
    const sidebarMenu = [
        // {
        //     key: "dashboard",
        //     label: <Link to={NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD}>Seller Dashboard</Link>,
        //     icon: <DashboardIcon />
        // },
        // {
        //     key: "product-management",
        //     label: (
        //         <Link to={NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_MANAGEMENT}>
        //             Product Management
        //         </Link>
        //     ),
        //     icon: <PrdouctIcon />
        // },
        // {
        //     key: "my-earnings",
        //     label: <Link to={NavigationRoutes.DASHBOARD_ROUTES.MY_EARNINGGS}>My Earnings</Link>,
        //     icon: <EarningsIcon />
        // },
        // {
        //     key: "payment-details",
        //     label: (
        //         <a
        //             onClick={() => {
        //                 // Open the modal here
        //                 modalRef?.current?.openModal();
        //             }}
        //         >
        //             Payment Details
        //         </a>
        //     ),
        //     icon: <PaymentIcon />
        // },
        // {
        //     key: "order-management",
        //     label: (
        //         <Link to={NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT}>
        //             Order Management
        //         </Link>
        //     ),
        //     icon: <OrderIcon />
        // },
        {
            key: "user-management",
            label: (
                <Link to={NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT}>
                    User Management
                </Link>
            ),
            icon: <UserIcon />
        },
        {
            key: "request-management",
            label: (
                <Link to={NavigationRoutes.DASHBOARD_ROUTES.REQUEST_MANAGEMENT}>
                    Request Management
                </Link>
            ),
            icon: <PaymentIcon />
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
                className={` bg-white ${customSiderClass} h-[100vh] `}
            >
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
