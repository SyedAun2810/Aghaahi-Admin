import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

import Logo from "@Assets/icons/logo.svg";
import styles from "./index.module.scss";

export default function AuthLayout() {
  return (
    <div className={`${styles["wrapper-container"]} `}>
      <Row>
        <Col
          xs={0}
          sm={0}
          md={12}
          lg={13}
          xl={13}
          xxl={14}
          className={`${styles["left-container"]}`}
        >
          <div className={`my-16 mx-20 flex flex-col h-5/6 `}>
            <Logo />
            <div className="mt-auto text-white ">
              <p className="text-[20px] ">Your Outdoor Experience Begins Now</p>
              <h1 className="2xl:text-[36px] xl:text-[34px] lg:text-[32px] mt-4 max-w-xl font-[700]">
                Look Who's Outdoors: Step into Adventure!
              </h1>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={11} xl={11} xxl={10} className="bg-white">
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}
