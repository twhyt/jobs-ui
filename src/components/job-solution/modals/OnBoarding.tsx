import React, { useLayoutEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";

import Logo from "@public/logo.png";
import Clover from "@public/clover.gif";
import BaseButton from "../BaseButton";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";

const OnBoarding = () => {
  const [modalOpen] = useState(false);

  useLayoutEffect(() => {
    fetchChloeGreeting();
  }, []);

  const fetchChloeGreeting = async () => {
    // try {
    //   const { data } = await axiosAuthInstance.get("/navigation/checkpoint");
    //   // console.log("fetchChloeGreeting data", data.chole_greeting);
    //   if (!data.chole_greeting) {
    //     setModalOpen(true);
    //   } else {
    //     setModalOpen(false);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleClick = async () => {
    // try {
    //   await axiosAuthInstance
    //     .post("/navigation/checkpoint", {
    //       checkpoint: "chole greeting",
    //     })
    //     .then(() => {
    //       setModalOpen(false);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <Modal
      open={modalOpen}
      // open={true}
      closable={false}
      footer={null}
      classNames={{ content: "!p-0" }}
      destroyOnClose
    >
      <div className="flex flex-col gap-[24px] items-center py-[40px] px-[24px]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-h5 text-center">{`Welcome to`}</h1>
            <Image
              priority
              unoptimized
              src={Logo}
              width={210}
              height={64}
              alt="jobs solution logo"
            />
          </div>
          <Image
            priority
            unoptimized
            src={Clover}
            width={128}
            height={128}
            alt="clover"
          />
        </div>
        <p className="font-body5 text-[var(--text-title)] w-full">
          Congratulations! You account is ready.
        </p>
        <p className="font-body5 text-[var(--text-title)]">
          If you have selected a value package, you can use the free sign-up
          bonus to use our features while the payment is being processed.
        </p>
        <BaseButton onClick={handleClick} className="!w-full !h-[38.8px]">
          {`Let's go`}
        </BaseButton>
      </div>
    </Modal>
  );
};

export default OnBoarding;
