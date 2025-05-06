import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import { Flex } from "antd";
import { useParams } from "react-router-dom";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import CouponDetailsHeader from "./Components/EmployeeDetailHeader";
import EmployeeDetailBody from "./Components/EmployeeDetailBody";


export default function ViewEmployeeDetails() {
    const { id: employeeId } = useParams();

    const { data: employeeDetails } = useEmployeeDetail(employeeId);

    const data = employeeDetails?.data;
    //console.log(data);
    return (
        <>
            <Flex className="" vertical gap={"large"}>
                <RoundedContainer className="mx-4 my-4 p-8" >
                    <CouponDetailsHeader
                        status={0}
                        couponId={Number(employeeId)}
                        backButtonClickHandler={()=>{
                            //console.log('backButtonClickHandler');
                        }}
                        deleteIconClickHandler={()=>{
                            //console.log('backButtonClickHandler');
                        }}
                    />
                    <EmployeeDetailBody data={data || {}} />
                </RoundedContainer>
            </Flex>
            {/* <CustomModal ref={deleteCouponModalRef}>
                <DeleteCouponModal
                    deleteHandler={deleteHandler}
                    modalCloseHandler={modalCloseHandler}
                    selectedCouponId={Number(couponId)}
                />
            </CustomModal> */}
        </>
    );
}
const useEmployeeDetail = (id: number | null | undefined) => {
    return useQuery(
        [queryKeys.authQueryKeys.employeeDetails], // Unique query key with employee ID
        async () => {
            const { ok, data } = await GetEmployeeDetail(id);
            if (ok) {
                return data;
            }
            throw new Error("Failed to fetch employee details");
        },
        {
            enabled: !!id // Only fetch if `id` is provided
        }
    );
};

async function GetEmployeeDetail(id: number) {
    const response = await ApiService.get(`${API_CONFIG_URLS.COMPANY.employee_listing}/${id}`);
    return response;
}