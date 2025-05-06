import AppLayout from "@Layout/AuthLayout/AuthLayout";
import AddOrUpdateAdmin from "@Pages/AppScreens/BannerManagement/AddOrUpdateAdmin";
import UserDetails from "@Pages/AppScreens/BannerManagement/userDetails";
import CompanyListing from "@Pages/AppScreens/CompanyAndEmployeeManagement/companyListing";
import ViewEmployeeDetails from "@Pages/AppScreens/CompanyAndEmployeeManagement/EmployeeDetail";
import EmployeeListing from "@Pages/AppScreens/CompanyAndEmployeeManagement/employeeListing";
import RequestManagement from "@Pages/AppScreens/RequestManagement";
import useAuthStore from "@Store/authStore";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
    ChangePassword,
    EditProfile,
    UserManagement
} from "./LazyImports";
import { NavigationRoutes } from "./NavigationRoutes";

const DashboardRoutes = [
    // {
    //     title: "Dashboard",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.DASHBOARD,
    //     component: <Dashboard />
    // },
    // {
    //     title: "MyEarnings",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.MY_EARNINGGS,
    //     component: <MyEarnings />
    // },
    // {
    //     title: "Chat",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.CHAT,
    //     component: <Chat />
    // },
    // {
    //     title: "ChatDetails",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.CHAT_DETAILS,
    //     component: <Chat />
    // },
    // {
    //     title: "OrderManagement",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.ORDER_MANAGEMENT,
    //     component: <OrderManagement />
    // },
    // {
    //     title: "OrderDetails",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.ORDER_DETAILS,
    //     component: <OrderDetails />
    // },
    // {
    //     title: "GenerateLabels",
    //     path: `${NavigationRoutes.DASHBOARD_ROUTES.GENERATE_LABELS_MAIN}/:id`,
    //     component: <GenerateLabels />
    // },
    // {
    //     title: "PaymentDetails",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.PAYMENT_DETAILS,
    //     component: <PaymentDetails />
    // },
    // {
    //     title: "ProductManagement",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_MANAGEMENT,
    //     component: <ProductManagement />
    // },
    // {
    //     title: "ProductDetails",
    //     path: `${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_DETAILS}/:id`,
    //     component: <ProductDetails />
    // },
    // {
    //     title: "AddProduct",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.ADD_PRODUCT,
    //     component: <AddProduct />
    // },
    // {
    //     title: "ProductEdit",
    //     path: `${NavigationRoutes.DASHBOARD_ROUTES.PRODUCT_EDIT}/:id`,
    //     component: <AddProduct />
    // },
    {
        title: "UserManagement",
        path: NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT,
        component: <UserManagement />
    },
    {
        title: "UserManagement",
        path: `${NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT}/:id`,
        component: <UserDetails />
    },
    {
        title: "UserManagement",
        path: `${NavigationRoutes.DASHBOARD_ROUTES.UPSERT_ADMIN}/:id`,
        component: <AddOrUpdateAdmin />
    },
    {
        title: "UserManagement",
        path: `${NavigationRoutes.DASHBOARD_ROUTES.UPSERT_ADMIN}`,
        component: <AddOrUpdateAdmin />
    },
    {
        title: "RequestManagement",
        path: NavigationRoutes.DASHBOARD_ROUTES.REQUEST_MANAGEMENT,
        component: <RequestManagement />
    },
    {
        title: "Company Management",
        path: NavigationRoutes.DASHBOARD_ROUTES.COMPANY_LISTING,
        component: <CompanyListing />
    },
    {
        title: "Employee Management",
        path: `${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_MANAGEMENT}/:id`,
        component: <EmployeeListing />
    },
    // {
    //     title: "BannerDetails",
    //     path: `${NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT_DETAILS}/:id`,
    //     component: <BannerManagementDetails />
    // },
    // {
    //     title: "RequestBanner",
    //     path: NavigationRoutes.DASHBOARD_ROUTES.REQUEST_BANNER,
    //     component: <RequestBanner />
    // },
    {
        title: "ChangePassword",
        path: NavigationRoutes.DASHBOARD_ROUTES.CHANGE_PASSWORD,
        component: <ChangePassword />
    },
    {
        title: "EditProfile",
        path: NavigationRoutes.DASHBOARD_ROUTES.EDIT_PROFILE,
        component: <EditProfile />
    },
    {
        title: "EmployeeDetails",
        path: `${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_DETAILLS}/:id`,
        component: < ViewEmployeeDetails />
    }
];

const Authenticated = () => {
    const { isAuth, userData } = useAuthStore();
    let role = userData?.role || 0;

    let route = role === 1 ? NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT : NavigationRoutes.DASHBOARD_ROUTES.COMPANY_LISTING
    const NAVIGATE_TO = isAuth
        ? route : NavigationRoutes.AUTH_ROUTES.LOGIN;

    useEffect(() => {
        document.title = "User-Management - Admin-Aghaahi";
    }, []);

    return (
        <Routes>
            <Route element={<AppLayout />}>
                {DashboardRoutes.map(({ path, component }, index) => {
                    return <Route key={index} path={path} element={component} />;
                })}
            </Route>
            <Route path="*" element={<Navigate to={NAVIGATE_TO} />} />
        </Routes>
    );
};

export default Authenticated;
