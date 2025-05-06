import React from "react";
import Status from "@Components/Status/Status";
import ActionIcon from "@Assets/icons/actionIcon.svg";

type CompanyColumnsType = {
    handleUpdate: (id: number) => void;
    handleDelete: (id: number) => void;
};

export const renderCompanyColumns = ({ handleUpdate, handleDelete,handleView }: any) => [
    {
        title: "ID",
        dataIndex: "company_id",
        key: "company_id",
        render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Company Name",
        dataIndex: "company_name",
        key: "company_name",
        render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Email",
        dataIndex: "company_email",
        key: "company_email",
        render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Total Employees",
        dataIndex: "total_employees",
        key: "total_employees",
        render: (data: string) => {
            return <p>{data ?? "0"}</p>;
        }
    },
    {
        title: "Status",
        dataIndex: "company_is_active",
        key: "company_is_active",
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
                    <div className="flex justify-center gap-2">
                        <div
                            onClick={() => handleView(data?.company_id)}
                            style={{ cursor: "pointer", display: "inline-block" }}
                        >
                            <ActionIcon />
                        </div>
                    </div>
                </div>
            );
        }
    }
];
