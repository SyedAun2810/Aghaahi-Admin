import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Checkbox, Form } from "antd";
import { CustomButton } from "@Components/Button";
import CustomSelectInput from "@Components/CustomSelectInput/CustomSelectInput";
import Input from "@Components/TextInput/TextInput";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import AuthHeader from "@Components/AuthHeader/AuthHeader";
import ApiService from "@Services/ApiService";
import { API_CONFIG_URLS } from "@Constants/config";
import { VALIDATE } from "@Constants/validationConstants";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

const ROLE_OPTIONS = [
    { label: "Super Admin", value: 1 },
    { label: "Admin", value: 2 }
];

const AddOrUpdateAdmin = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const isUpdateMode = !!id;
    const navigate = useNavigate();

    console.log("Admin ID:", id);

    const { data: adminDetails, isLoading: isAdminLoading } = useAdminDetail(id ? parseInt(id) : null);

    const { mutate: submitMutate, isLoading: isSubmitting, isSuccess } = useMutation(
        isUpdateMode ? updateAdmin : createAdmin
    );

    if (isSuccess) navigate(NavigationRoutes.DASHBOARD_ROUTES.USER_MANAGEMENT);

    React.useEffect(() => {
        if (isUpdateMode && adminDetails) {
            const data = adminDetails?.data;
            form.setFieldsValue({
                full_name: data?.full_name,
                email: data?.email,
                country_code: data?.country_code,
                phone_number: data?.phone_number,
                role: data?.role,
                is_active: data?.is_active
            });
        }
    }, [isUpdateMode, adminDetails, form]);

    const handleSubmit = (values: any) => {
        if (isUpdateMode) {
            values.adminId = id; // Add adminId to payload for update
        }
        submitMutate(values);
    };

    return (
        <Wrapper>
            <AuthHeader
                headerTitle={isUpdateMode ? "Update Admin" : "Add Admin"}
                subTitle={
                    isUpdateMode
                        ? "Update the details of the admin"
                        : "Fill in the details to add a new admin"
                }
            />
            <Form
                form={form}
                onFinish={handleSubmit}
                scrollToFirstError
                initialValues={{
                    country_code: "+966",
                    is_active: true
                }}
            >
                <Row gutter={16}>
                    {/* Full Name */}
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="full_name" rules={VALIDATE.SELLER_NAME as never}>
                            <Input label="Full Name" placeholder="Enter full name" />
                        </Form.Item>
                    </Col>

                    {/* Email */}
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="email" rules={VALIDATE.EMAIL as never}>
                            <Input
                                label="Email"
                                placeholder="Enter email address"
                                disabled={isUpdateMode} // Email shouldn't be changed after creation
                            />
                        </Form.Item>
                    </Col>

                    {/* Country Code */}
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="country_code">
                            <Input label="Country Code" placeholder="Enter country code" />
                        </Form.Item>
                    </Col>

                    {/* Phone Number */}
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="phone_number" rules={VALIDATE.PHONE as never}>
                            <Input label="Phone Number" placeholder="Enter phone number" />
                        </Form.Item>
                    </Col>

                    {/* Role */}
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name="role" rules={VALIDATE.ROLE as never}>
                            <CustomSelectInput
                                label="Role"
                                placeholder="Select role"
                                options={ROLE_OPTIONS}
                            />
                        </Form.Item>
                    </Col>

                    {/* Password (Only for Add Mode) */}
                    {!isUpdateMode && (
                        <Col xs={24} sm={24} md={12}>
                            <Form.Item name="password" rules={VALIDATE.PASSWORD_PATTERN as never}>
                                <Input isPassword label="Password" placeholder="Enter password" />
                            </Form.Item>
                        </Col>
                    )}

                    {/* Status */}
                    <Col xs={24} sm={24} md={24}>
                        <Form.Item name="is_active" valuePropName="checked">
                            <Checkbox>Admin Status Active?</Checkbox>
                        </Form.Item>
                    </Col>

                    {/* Submit Button */}
                    <Col xs={24} sm={24} md={8}>
                        <Form.Item className="mt-8 text-center">
                            <CustomButton
                                title={isUpdateMode ? "Update Admin" : "Add Admin"}
                                className="text-base w-[100%]"
                                isLoading={isSubmitting}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Wrapper>
    );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <RoundedContainer className="my-4 mx-4">
            {children}
        </RoundedContainer>
    );
};

const useAdminDetail = (id: number | null) => {
    return useQuery(
        ["getAdminDetail", id],
        async () => {
            if (!id) return null;
            const response = await ApiService.get(`${API_CONFIG_URLS.ADMIN.GET_ADMIN_BY_ID}/${id}`);
            if (!response.ok) throw new Error("Failed to fetch admin details");
            return response.data;
        },
        {
            enabled: !!id
        }
    );
};

const createAdmin = (payload: any) => {
    return ApiService.post(API_CONFIG_URLS.ADMIN.CREATE_ADMIN, payload);
};

const updateAdmin = (payload: any) => {
    return ApiService.put(`${API_CONFIG_URLS.ADMIN.UPDATE_ADMIN.replace("{adminId}", payload.adminId)}`, payload);
};

export default AddOrUpdateAdmin;
