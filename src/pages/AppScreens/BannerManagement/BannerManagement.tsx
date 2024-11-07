import { PAGE_SIZE } from "@Constants/app";
import GridView from "@Components/GridView";
import { renderBannerColumns } from "./Columns/renderBannerColumns";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import useBannerManagementContainer from "./useBannerManagementContainer";
import ListingFilters from "./Components/ListingFilters";
import ListingHeader from "./Components/ListingHeader";
import CustomModal from "@Components/CustomModal/CustomModal";
import CheckoutForm from "../RequestBanner/CheckoutForm/CheckoutForm";

const BannerManagement = () => {
    const {
        addValues,
        filtersData,
        clientSecret,
        handleReOrder,
        paymentModalRef,
        pageClickHandler,
        onPaymentSuccess,
        bannerListingData,
        clearFilterHandler,
        onStatusUpdateClick,
        bannerRequestHandler,
        isBannerListingLoading
    } = useBannerManagementContainer();

    return (
        <RoundedContainer>
            <ListingHeader bannerRequestHandler={bannerRequestHandler} />
            <ListingFilters
                endDate={filtersData?.EndDate}
                clearFilter={clearFilterHandler}
                startDate={filtersData?.StartDate}
                updateValuesHandler={addValues}
                selectedType={filtersData?.Type}
                selectedStatus={filtersData?.isHidden}
            />
            <GridView
                showPagination
                columns={renderBannerColumns({ onStatusUpdateClick, handleReOrder })}
                pagination={{
                    total: bannerListingData?.pagination?.totalCount
                }}
                onChange={() => console.log("OnChange")}
                totalCount={bannerListingData?.pagination?.totalCount}
                onPaginate={(page) => {
                    pageClickHandler(page);
                }}
                selectedPage={filtersData?.PageNumber}
                pageSize={PAGE_SIZE}
                isLoading={isBannerListingLoading}
                isFetching={isBannerListingLoading}
                data={bannerListingData?.data || []}
            />
            <CustomModal ref={paymentModalRef} destroyOnClose>
                <CheckoutForm onFinish={onPaymentSuccess} clientSecret={clientSecret} />
            </CustomModal>
        </RoundedContainer>
    );
};

export default BannerManagement;
