import { Col, Row } from "antd";
import { motion } from "framer-motion";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import useEditProfileContainer from "./EditProfileContainer";
import PictureUpload from "@Components/PictureUpload";
import useAuthStore from "@Store/authStore";

const EditProfile = () => {
    const { userData } = useAuthStore();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <RoundedContainer className="pt-12 px-12">
            <motion.h1
                className="font-[500] text-xxl border-bottom pb-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                Your Profile
            </motion.h1>
            <motion.div
                className="mt-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Row gutter={[16, 16]} className="mb-8">
                    <Col span={8} className="text-center">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <PictureUpload
                                userName={userData.full_name}
                                image={userData.image}
                                isLoading={false}
                            />
                            <h2 className="mt-4 text-xl font-bold">{userData.full_name}</h2>
                            <p className="text-gray-500">{userData.role === 1 ? "Admin" : "User"}</p>
                        </motion.div>
                    </Col>
                    <Col span={16}>
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Email</h3>
                                <p className="text-gray-800">{userData.email}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Contact#</h3>
                                <p className="text-gray-800">
                                    {userData.country_code} {userData.phone_number}
                                </p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">MFA Enabled</h3>
                                <p className="text-gray-800">{userData.is_mfa_enabled ? "Yes" : "No"}</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-gray-600 font-semibold">Status</h3>
                                <p className="text-gray-800">{userData.is_active ? "Active" : "Inactive"}</p>
                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </motion.div>
        </RoundedContainer>
    );
};

export default EditProfile;
