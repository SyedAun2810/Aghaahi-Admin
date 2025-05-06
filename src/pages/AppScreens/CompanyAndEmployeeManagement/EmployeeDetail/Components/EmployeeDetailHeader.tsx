import { Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { NavigationRoutes } from "@Navigation/NavigationRoutes";

import BackIcon from "@Assets/icons/backIcon.svg";
import EditIcon from "@Assets/icons/editIcon.svg";
import DeleteIcon from "@Assets/icons/deleteIcon.svg";
import { CustomButton } from "@Components/Button";

interface CouponDetailsHeaderType {
    status: number;
    couponId: number;
    backButtonClickHandler: () => void;
    deleteIconClickHandler: (couponId: number) => void;
}

export default function CouponDetailsHeader({
    status,
    couponId,
    backButtonClickHandler,
    deleteIconClickHandler
}: CouponDetailsHeaderType) {
    const navigate = useNavigate();

    return (
        <Flex align="center" gap={"middle"} justify="space-between" className="border-bottom pb-6 px-4">
            <Flex align="center" gap={"middle"}>
                <BackIcon className="cursor-pointer mt-[3px]" onClick={() => navigate(-1)} />
                <h1 className="font-[500] text-[1.2rem] md:text-xxl text-dark-main">
                    Employee Details
                </h1>
            </Flex>
        </Flex>
    );
}

export const COUPON_STATUS = {
    0: { name: "Active", bgColor: "#F380011A", color: "#F38001" },
    1: { name: "In-Active", bgColor: "#FA513A1A", color: "#FA513A" }
};
