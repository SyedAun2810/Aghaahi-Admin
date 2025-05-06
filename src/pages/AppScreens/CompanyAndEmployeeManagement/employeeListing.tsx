import React, { useState } from "react";
import { PAGE_SIZE } from "@Constants/app";
import GridView from "@Components/GridView";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { useQuery } from "@tanstack/react-query";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { renderEmployeeColumns } from "./Columns/renderEmployeeColumns";
import ListingHeader from "../BannerManagement/Components/ListingHeader";
import { useNavigate, useParams } from "react-router-dom";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

const EmployeeListing = () => {
    const {id} = useParams(); 
     const [currentPage, setCurrentPage] = useState(1);
     const navigate = useNavigate();

    const { data: employeeData = [], isLoading: isEmployeesLoading } = useQuery(
        ["getEmployees", id, currentPage],
        async () => {
            const url = `${API_CONFIG_URLS.COMPANY.employee_listing}?company_id=${id}&page=${currentPage}&limit=${PAGE_SIZE}`;
            const response = await ApiService.get(url);
            if (!response.ok) throw new Error("Failed to fetch employees");
            return response?.data;
        },
        { keepPreviousData: true, enabled: !!id } // Fetch only if companyId is provided
    );

    const employeeListingData = {
        data: Array.isArray(employeeData?.data?.employees) ? employeeData?.data?.employees : [], // Ensure data is always an array
        pagination: {
            totalCount: employeeData?.data?.count || 0
        }
    };
    
    console.log("Employee Data:", employeeData);

    const handleView = (employeeId: number) => {
        navigate(NavigationRoutes.DASHBOARD_ROUTES.EMPLOYEE_DETAILLS + `/${employeeId}`)
    };

    const handleDelete = (employeeId: number) => {
        console.log("Delete action taken on Employee ID:", employeeId);
    };

    const handlePaginate = (page: number) => {
        console.log("Paginate to page:", page);
        setCurrentPage(page);
    };

    return (
        <RoundedContainer>
            <ListingHeader selectedStatus={"active"} title={"Company Users"} />
            <GridView
                showPagination
                columns={renderEmployeeColumns({ handleView, handleDelete })}
                pagination={{
                    total: employeeListingData.pagination.totalCount
                }}
                onChange={() => console.log("OnChange")}
                totalCount={employeeListingData.pagination.totalCount}
                onPaginate={handlePaginate}
                selectedPage={currentPage}
                pageSize={PAGE_SIZE}
                isLoading={isEmployeesLoading}
                isFetching={isEmployeesLoading}
                data={employeeListingData.data} // Ensure data is always an array
            />
        </RoundedContainer>
    );
};

export default EmployeeListing;
