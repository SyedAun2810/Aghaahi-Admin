import { CustomButton } from "@Components/Button";
import CustomSearch from "@Components/CustomSearch/CustomSearch";
import { SelectInput } from "@Components/SelectInput";
import { BANNER_STATUS_OPTIONS } from "@Constants/app";
import { Flex } from "antd";

export default function ListingHeader({
    bannerRequestHandler,
    selectedStatus,
    title,
    children
}: {
    bannerRequestHandler: () => void;
    selectedStatus: string;
    title?: string;
    children?: React.ReactNode;
}) {
    return (
    <div className="border28-bottom pb-4">
         <Flex align="center" justify="space-between" className=" h-[56px] pb-4">
            <h1 className="font-[500] text-xxl text-dark-main">{title}</h1>
            <div className="flex justify-center gap-4 items-center">
                {children}
                <SelectInput
                    options={BANNER_STATUS_OPTIONS}
                    onChange={(value) => {}}
                    placeholder={"Status"}
                    className="ml-2 shrink-0 flex-grow"
                    value={selectedStatus}
                />
            </div>
        </Flex>
        <CustomSearch
                        debounceSearch={(text) => {
                            // onChangeInput(text);
                        }}
                    />
    </div>
    );
}
