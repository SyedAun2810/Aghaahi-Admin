import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

import Logo from "@Assets/images/logo.png";
import styles from "./index.module.scss";

export default function AuthLayout() {
  return (
    <div className={`${styles["wrapper-container"]} `}>
      <Row>
        <Col
          xs={0}
          sm={0}
          md={12}
          lg={14}
          xl={14}
          xxl={15}
          className={`${styles["left-container"]}`}
        >
          <div className={`mt-8 ml-20 flex flex-col h-screen pb-16`}>
            <img src={Logo} width={150} height={150} className=""/>
            {/* <h1 className="text-white font-bold">Logo here</h1> */}
            <div className="mt-auto text-white ">
              {/* <p className="text-[20px] ">Your Outdoor Experience Begins Now</p> */}
              <h1 className="2xl:text-[32px] xl:text-[30px] lg:text-[32px] mt-4 max-w-xl font-[700]">
                Aghaahi-Admin Panel To Manage Users
              </h1>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={9} className="bg-white">
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}
