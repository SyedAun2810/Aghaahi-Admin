import GridView from "@Components/GridView";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { PAGE_SIZE } from "@Constants/app";
import { API_CONFIG_URLS } from "@Constants/config";
import ApiService from "@Services/ApiService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingHeader from "../BannerManagement/Components/ListingHeader";
import { renderCompanyColumns } from "./Columns/renderCompanyColumns";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
// import ListingHeader from "Components/ListingHeader";

const CompanyListing = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const { data: companyData = [], isLoading: isCompaniesLoading } = useQuery(
        ["getCompanies", currentPage],
        async () => {
            const url = `${API_CONFIG_URLS.COMPANY.listing}?page=${currentPage}&limit=${PAGE_SIZE}`;
            const response = await ApiService.get(url);
            if (!response.ok) throw new Error("Failed to fetch companies");
            return response?.data;
        },
        { keepPreviousData: true } // Keep previous data while fetching new data
    );

    const companyListingData = {
        data: Array.isArray(companyData?.data?.companies) ? companyData?.data?.companies : [], // Ensure data is always an array
        pagination: {
            totalCount: companyData?.data?.count || 0
        }
    };

    const handleUpdate = (companyId: number) => {
        console.log("Update action taken on Company ID:", companyId);
    };

    const handleDelete = (companyId: number) => {
        console.log("Delete action taken on Company ID:", companyId);
    };

    const handlePaginate = (page: number) => {
        console.log("Paginate to page:", page);
        setCurrentPage(page);
    };

    const handleView = (id: any) => {
        navigate(`${NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_MANAGEMENT}/${id}`)
    }

    return (
        <RoundedContainer>
            <ListingHeader selectedStatus={"active"} title={"Company Management"} />
            <GridView
                showPagination
                columns={renderCompanyColumns({ handleUpdate, handleDelete,handleView })}
                pagination={{
                    total: companyListingData.pagination.totalCount
                }}
                onChange={() => console.log("OnChange")}
                totalCount={companyListingData.pagination.totalCount}
                onPaginate={handlePaginate}
                selectedPage={currentPage}
                pageSize={PAGE_SIZE}
                isLoading={isCompaniesLoading}
                isFetching={isCompaniesLoading}
                data={companyListingData.data} // Ensure data is always an array
            />
        </RoundedContainer>
    );
};

export default CompanyListing;
