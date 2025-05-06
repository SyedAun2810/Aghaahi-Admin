import { PAGE_SIZE } from "@Constants/app";
import GridView from "@Components/GridView";
import { renderBannerColumns } from "./Columns/renderBannerColumns";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import ListingFilters from "./Components/ListingFilters";
import ListingHeader from "./Components/ListingHeader";
import CustomModal from "@Components/CustomModal/CustomModal";
import CheckoutForm from "../RequestBanner/CheckoutForm/CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { CustomButton } from "@Components/Button";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

const UserManagement = () => {
    const {
        addValues,
        filtersData,
        clientSecret,
        handleReOrder,
        paymentModalRef,
        pageClickHandler,
        onPaymentSuccess,
        clearFilterHandler,
        onStatusUpdateClick,
        bannerRequestHandler,
        isBannerListingLoading
    } = {
        addValues: {},
        filtersData: {},
        clientSecret: "dummy-client-secret",
        handleReOrder: () => console.log("Handle ReOrder"),
        paymentModalRef: { current: null },
        pageClickHandler: (page) => console.log("Page Clicked:", page),
        onPaymentSuccess: () => console.log("Payment Success"),
        clearFilterHandler: () => console.log("Clear Filters"),
        onStatusUpdateClick: (status) => console.log("Status Update Clicked:", status),
        bannerRequestHandler: () => console.log("Banner Request Handler"),
        isBannerListingLoading: false
    };

    const navigate = useNavigate();
    function handleAddAdmin() {
        navigate(NavigationRoutes.DASHBOARD_ROUTES.UPSERT_ADMIN);
    }

    const { data: adminData = [], isLoading: isAdminsLoading } = useQuery(
        ["getAdmins"],
        async () => {
            const response = await ApiService.get(API_CONFIG_URLS.ADMIN.GET_ADMINS);
            if (!response.ok) throw new Error("Failed to fetch admins");
            return response.data?.data?.admins;
        }
    );

    console.log("Admin Data:", adminData);

    const bannerListingData = {
        data: Array.isArray(adminData) ? adminData : [], // Ensure data is always an array
        pagination: {
            totalCount: Array.isArray(adminData) ? adminData.length : 0
        }
    };

    const handleUpdate = (userId: number) => {
        console.log("Update action taken on User ID:", userId);
    };

    const handleDelete = (userId: number) => {
        console.log("Delete action taken on User ID:", userId);
    };

    

    return (
        <RoundedContainer>
            <ListingHeader bannerRequestHandler={bannerRequestHandler} selectedStatus={"active"} title={"User Management"}>
                <CustomButton
                    onClick={handleAddAdmin}
                    title={"Add Admin"}
                    className="text-base w-[90%]"
                />
            </ListingHeader>
            <GridView
                showPagination
                columns={renderBannerColumns({ onStatusUpdateClick, handleReOrder, handleUpdate, handleDelete })}
                pagination={{
                    total: bannerListingData.pagination.totalCount
                }}
                onChange={() => console.log("OnChange")}
                totalCount={bannerListingData.pagination.totalCount}
                onPaginate={(page) => {
                    console.log("Paginate to page:", page);
                }}
                selectedPage={1}
                pageSize={PAGE_SIZE}
                isLoading={isAdminsLoading}
                isFetching={isAdminsLoading}
                data={bannerListingData.data} // Ensure data is always an array
            />

            <CustomModal ref={paymentModalRef} destroyOnClose>
                <CheckoutForm onFinish={onPaymentSuccess} clientSecret={clientSecret} />
            </CustomModal>
        </RoundedContainer>
    );
};

export default UserManagement;
