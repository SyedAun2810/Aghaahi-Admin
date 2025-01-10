import { Link } from "react-router-dom";

import Status from "@Components/Status/Status";
import { PlanType } from "@Constants/app";
import { NavigationRoutes } from "@Navigation/NavigationRoutes";

import DetailsIcon from "@Assets/icons/eyeDetailIcon.svg";
import CustomSwitch from "@Components/CustomSwitch/CustomSwitch";

type BannerColumnsType = {
    onStatusUpdateClick: (id: number) => void;
    handleReOrder: (id: number) => void;
};

export const renderBannerColumns = ({ onStatusUpdateClick, handleReOrder }: BannerColumnsType) => [
    {
        title: "S.No",
        dataIndex: "id",
        key: "sNo",
        render: (data: string) => {
            return <p>{data ?? "--"}</p>;
        }
    },
    {
        title: "User Name",
        dataIndex: "userName",
        key: "userName",
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
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (data: string) => {
            return <p>{data}</p>;
        }
    },
    {
        title: "Date Requested",
        dataIndex: "dateRequested",
        key: "dateRequested",
        render: (data: string) => {
            return <p>{data}</p>;
        }
    },

    {
        title: "Action",
        // dataIndex: "isBoosted",
        key: "action",
        align: "center",
        render: (data: any) => {
            return (
                <div className="flex justify-center gap-2">
                    <CustomSwitch isDisabled handleUpdate={() =>{}}/>
                </div>
            );
        }
    }
];


Ms. Khushbakht Khan has been actively involved in data collection and contributing to the initial development of customizable dashboards. She has also worked on backend functionality for report generation and participated in compiling the project documentation.
Ms. Sarah Sami has focused on data preprocessing, training the language model (LLM), and establishing database connectivity. He has been managing backend tasks related to voice-to-query functionality and contributed to the initial project documentation.
Mr. Syed Aun Muhammad has been responsible for data collection, designing frontend interface components for the dashboard, and developing preliminary visualization modules. She has also contributed to integrating the chatbot with the system and the preparation of the project report.
Mr. Moiz Naveed has worked on data validation, training the chatbot using different models, and implementing preliminary user roles and access control mechanisms. He has also contributed to customizing dashboard elements and compiling sections of the project report.
All team members were actively engaged in analyzing the requirements provided by the industry advisor and ensuring the project aligns with the inventory management schema shared. Together, the team focused on research, design, and implementation of the foundational features, ensuring significant progress in the initial phases of the project.