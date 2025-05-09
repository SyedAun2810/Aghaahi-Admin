import { Link } from "react-router-dom";

import Status from "@Components/Status/Status";
import { PlanType } from "@Constants/app";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import EditIcon from "@Assets/icons/editIcon.svg";

import DetailsIcon from "@Assets/icons/eyeDetailIcon.svg";
import CustomSwitch from "@Components/CustomSwitch/CustomSwitch";

type BannerColumnsType = {
    onStatusUpdateClick: (id: number) => void;
    handleReOrder: (id: number) => void;
    handleUpdate: (id: number) => void;
    handleDelete: (id: number) => void;
};

export const renderBannerColumns = ({ onStatusUpdateClick, handleReOrder, handleUpdate, handleDelete }: BannerColumnsType) => [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (data: number) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Full Name",
        dataIndex: "full_name",
        key: "full_name",
        render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Phone Number",
        dataIndex: "phone_number",
        key: "phone_number",
        render: (data: string, record: any) => {
            return <p>{`${record.country_code} ${data}` ?? "--"}</p>;
        }
    },
    {
        title: "Status",
        dataIndex: "is_active",
        key: "is_active",
        align: "center",
        render: (data: boolean) => {
            return <Status active={data} />;
        }
    },
    {
        title: "Action",
        key: "action",
        align: "center",
        render: (data: any) => {
            return (


                <div className="flex justify-center gap-2">
                    <CustomSwitch isDisabled handleUpdate={handleUpdate} />
                    <Link
                        to={`${NavigationRoutes.DASHBOARD_ROUTES.UPSERT_ADMIN}/${data.id}`}
                        className="text-large text-main-orange font-[500] cursor-pointer"
                    >
                        <EditIcon className="ml-2" />
                    </Link>
                </div>
            );
        }
    }
];
