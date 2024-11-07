import dayjs from "dayjs";
import { Link } from "react-router-dom";

import utilService from "@Utils/utils.service";
import Status from "@Components/Status/Status";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";
import CustomSwitch from "@Components/CustomSwitch/CustomSwitch";
import { BANNER_STATUS, GENERAL_FORMAT_DATE_ONLY, PlanType } from "@Constants/app";

import DetailsIcon from "@Assets/icons/eyeDetailIcon.svg";

type BannerColumnsType = {
    onStatusUpdateClick: (id: number) => void;
    handleReOrder: (id: number) => void;
};

export const renderBannerColumns = ({ onStatusUpdateClick, handleReOrder }: BannerColumnsType) => [
    {
        title: "S.No ",
        dataIndex: "id",
        key: "sNo",
        render: (data: string) => {
            return <p>{data}</p>;
        }
    },
    {
        title: "Banner Type",
        dataIndex: "package",
        key: "bannerType",
        render: (data: string) => <div> {PlanType[data?.type]?.name || "--"} </div>
    },
    {
        title: "Date Requested",
        dataIndex: "requestedDate",
        key: "dateRequested",
        render: (data: string) => (
            <div> {data ? utilService.formatDate(data, GENERAL_FORMAT_DATE_ONLY) : "--"} </div>
        )
    },
    {
        title: "Validity (To/From)",
        key: "validityRange",
        render: (data: string) => (
            <div>{utilService.calculateValidity(data?.startDate, data?.endDate)}</div>
        )
    },
    {
        title: "Duration",
        key: "duration",
        render: (data: string) => (
            <div>{`${utilService.calculateDuration(data?.startDate, data?.endDate)}`}</div>
        )
    },
    {
        title: "Remaining",
        key: "remaining",
        render: (data: string) => (
            <div>
                {" "}
                {data?.endDate
                    ? utilService.calculateRemainingDays(
                          dayjs.utc().format(GENERAL_FORMAT_DATE_ONLY),
                          data?.endDate
                      )
                    : "--"}
            </div>
        )
    },
    {
        title: "Status",
        dataIndex: "isBoosted",
        key: "status",
        align: "center",
        render: (data: boolean) => {
            return <Status active={data} />;
        }
    },
    {
        title: "Visibility",
        align: "center",
        key: "visibility",
        render: (data: any) => {
            return (
                <p>
                    <span className="text-light-text text-xs mr-2">
                        {data?.isHidden ? "Hidden" : "Visible"}
                    </span>
                    <CustomSwitch
                        isChecked={data?.isHidden}
                        handleUpdate={() => onStatusUpdateClick(data?.id)}
                        statusMap={{
                            true: BANNER_STATUS.HIDE,
                            false: BANNER_STATUS.UN_HIDE
                        }}
                    />
                </p>
            );
        }
    },
    {
        title: "Action",
        // dataIndex: "isBoosted",
        key: "action",
        align: "center",
        render: (data: any) => {
            let className = "text-light-text";
            if (!data?.isBoosted) {
                className = "text-main-orange border-main-orange";
            }
            return (
                <div className="flex justify-center">
                    <p
                        onClick={!data?.isBoosted ? () => handleReOrder(data?.id) : () => {}}
                        className="mr-2"
                    >
                        <span
                            className={`${className} text-xs font-[400] border-bottom ${!data?.isBoosted ? "cursor-pointer" : "cursor-default"}`}
                        >
                            Re-Order
                        </span>
                    </p>
                    <Link
                        to={`${NavigationRoutes.DASHBOARD_ROUTES.BANNER_MANAGEMENT_DETAILS}/${data?.id}`}
                        className="mr-2"
                    >
                        <DetailsIcon />
                    </Link>
                </div>
            );
        }
    }
];
