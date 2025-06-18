import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import styled from "styled-components";
// import { useAppSelector } from "@/store/redux-hook";

const Account = ({ fullnameWidth = "w-full" }: { fullnameWidth?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const { profilePicture, fullname, email } = useAppSelector(
  //   (state) => state.user
  // );

  let profilePicture;
  let fullname;
  let email;

  return (
    <AccountBox>
      <ProfileImage
        imgSrc={profilePicture || undefined}
        // emailAccount={email}
        name={fullname || undefined}
        loading={isLoading}
        setLoading={setIsLoading}
        skipCleanupProfilePic
        skipFetchProfileImage
      />
      <div>
        <p
          className={`font-h7 text-[var(--text-title)] ${fullnameWidth} truncate overflow-hidden`}
        >
          {fullname}
        </p>
        <p className="font-body2 text-[var(--text-secondary)]">{email}</p>
      </div>
    </AccountBox>
  );
};

export default Account;

const AccountBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
`;
