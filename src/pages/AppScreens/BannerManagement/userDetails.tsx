import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { motion } from "framer-motion";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { queryKeys } from "@Constants/queryKeys";

const EMPLOYEE_STATUS = {
    0: { name: "Active", color: "#52C41A", bgColor: "#F6FFED" },
    1: { name: "Inactive", color: "#FF4D4F", bgColor: "#FFF2F0" }
};

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const UserDetails = () => {
    const { id } = useParams();
    console.log("Admin ID:", id);
    const { data: adminData, isLoading, isError, error } = useAdminDetail(id);
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    if (!adminData) {
        return <p>No data found</p>;
    }

    const {
        full_name,
        email,
        country_code,
        phone_number,
        gender,
        is_active,
        role
    } = adminData;

    const formattedStatus = is_active ? 0 : 1;

    return (
        <motion.div
            className="px-12 my-4 py-12 bg-white rounded-[8px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Row gutter={[10, 20]}>
                {/* Personal Information Section */}
                <Col span={24}>
                    <motion.h3
                        className="text-lg font-semibold mb-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Personal Information
                    </motion.h3>
                </Col>

                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Full Name" />
                    <Value value={full_name || "--"} />
                </Col>

                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Email" />
                    <Value value={email || "--"} />
                </Col>

                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Phone Number" />
                    <Value value={`${country_code || ""} ${phone_number || ""}`.trim() || "--"} />
                </Col>

                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Gender" />
                    <Value value={gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "--"} />
                </Col>

                {/* Employment Details Section */}
                <Col span={24} className="mt-4">
                    <motion.h3
                        className="text-lg font-semibold mb-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        Employment Details
                    </motion.h3>
                </Col>

                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Role" />
                    <Value value={role || "--"} />
                </Col>

                <Col xxl={6} xl={6} lg={6} md={6} xs={24}>
                    <Label title="Status" />
                    <motion.div
                        className={`px-[12px] py-[4px] rounded-[4px] inline-block`}
                        style={{
                            color: EMPLOYEE_STATUS[formattedStatus]?.color,
                            backgroundColor: EMPLOYEE_STATUS[formattedStatus]?.bgColor,
                            width: "fit-content"
                        }}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {EMPLOYEE_STATUS[formattedStatus]?.name}
                    </motion.div>
                </Col>
            </Row>
        </motion.div>
    );
};

const Label = ({ title }: { title: string }) => {
    return <p className="text-#717171 text-xs font-[400] mb-2">{title}</p>;
};

const Value = ({ value }: { value: string }) => {
    return <p className="text-dark-main text-[14px] font-[400] break-words">{value}</p>;
};

export default UserDetails;


const useAdminDetail = (adminId: any) => {
    return useQuery(
        [queryKeys.authQueryKeys.userDetail, adminId], // Include employeeId in the query key
        async () => {
            const { ok, data } = await getAdminDetails(adminId);
            if (ok) {
                return data?.data;
            }
            throw new Error("Failed to fetch chat history");
        }    
    );
};

async function getAdminDetails(adminId: any) {
    return  await ApiService.get(`${API_CONFIG_URLS.ADMIN.GET_ADMIN_BY_ID}/${adminId}`);
}