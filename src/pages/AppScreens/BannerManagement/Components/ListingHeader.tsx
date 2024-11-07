import { CustomButton } from "@Components/Button";
import { Flex } from "antd";

export default function ListingHeader({
    bannerRequestHandler
}: {
    bannerRequestHandler: () => void;
}) {
    return (
        <Flex align="center" justify="space-between" className="border-bottom h-[56px] pb-4">
            <h1 className="font-[500] text-xxl text-dark-main ">Banner Management</h1>
            <CustomButton
                title="Request a Banner"
                className="w-[160px] text-sm "
                textClassName=" font-[500]"
                onClick={bannerRequestHandler}
            />
        </Flex>
    );
}
