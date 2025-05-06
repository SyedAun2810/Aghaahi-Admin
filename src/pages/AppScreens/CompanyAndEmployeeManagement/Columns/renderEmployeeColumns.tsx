import React from "react";
import Status from "@Components/Status/Status";
import ActionIcon from "@Assets/icons/actionIcon.svg";
import { AnyTxtRecord } from "node:dns";

type EmployeeColumnsType = {
    handleUpdate: (id: number) => void;
    handleDelete: (id: number) => void;
};

export const renderEmployeeColumns = ({ handleView, handleDelete }: any) => [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (data: number) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
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
            return <p>{`${record.country_code || ""} ${data}`.trim() || "--"}</p>;
        }
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (data: any) => {
            return <p>{data?.name ?? "--"}</p>;
        }
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
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
                    <div
                        onClick={() =>handleView(data?.id)}
                        style={{ cursor: "pointer", display: "inline-block" }}
                    >
                        <ActionIcon />
                    </div>
                </div>
            );
        }
    }
];
