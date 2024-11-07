import React, { useRef } from "react";
import BannerIcon from "@Assets/icons/bannerAdIcon.svg";
import EarningsIcon from "@Assets/icons/myEarningsIcon.svg";
import OrderIcon from "@Assets/icons/orderManagementIcon.svg";
import PaymentIcon from "@Assets/icons/paymentDetailsIcon.svg";
import DashboardIcon from "@Assets/icons/sellerDashboardIcon.svg";
import PrdouctIcon from "@Assets/icons/productManagementIcon.svg";
import { Link } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import Sider from "antd/es/layout/Sider";
import DarkLogo from "@Assets/icons/darkLogo.svg";
import { Menu } from "antd";
import { useAuthLayoutContainer } from "./useAuthLayoutContainer";
import CustomModal from "@Components/CustomModal/CustomModal";
import PaymentDetailsPassword from "@Pages/AppScreens/PaymentDetails/PasswordModal/PaymentDetailsAccess";
import { ModalMethodsTypes } from "@Utils/types";

const SideBar = () => {
    const { route, selectedKey, navigate } = useAuthLayoutContainer();

    const modalRef = useRef<ModalMethodsTypes | null>(null);
    const sidebarMenu = [
        {
            key: "dashboard",
            label: <Link to={NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD}>Seller Dashboard</Link>,
            icon: <DashboardIcon />
        },
        {
            key: "product-management",
            label: (
                <Link to={NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_MANAGEMENT}>
                    Product Management
                </Link>
            ),
            icon: <PrdouctIcon />
        },
        {
            key: "my-earnings",
            label: <Link to={NavigationRoutes.DASHBOARD_ROUTES.MY_EARNINGGS}>My Earnings</Link>,
            icon: <EarningsIcon />
        },
        {
            key: "payment-details",
            label: (
                <a
                    onClick={() => {
                        // Open the modal here
                        modalRef?.current?.openModal();
                    }}
                >
                    Payment Details
                </a>
            ),
            icon: <PaymentIcon />
        },
        {
            key: "order-management",
            label: (
                <Link to={NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT}>
                    Order Management
                </Link>
            ),
            icon: <OrderIcon />
        },
        {
            key: "banner-ad-management",
            label: (
                <Link to={NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT}>
                    Banner Ad Management
                </Link>
            ),
            icon: <BannerIcon />
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
                    <DarkLogo
                        className="text-main-orange"
                        onClick={() => navigate(NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD)}
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
