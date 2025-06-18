"use client";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

const getInitials = (data: string) => {
  const namePart = data.split("@")[0]; // Get the name before "@"
  const nameParts = namePart.split(/[.\s_-]/); // Split by common separators
  return nameParts
    .map((part) => part.charAt(0).toUpperCase()) // Get the first letter of each part
    .join("")
    .slice(0, 2); // Limit to 2 characters
};

const ProfileImage = ({
  imgSrc,
  // emailAccount,
  name,
  loading,
  setLoading,
  setHasImage,
  skipCleanupProfilePic = false,
  skipFetchProfileImage = false,
}: {
  imgSrc?: string;
  // emailAccount?: string;
  name?: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHasImage?: React.Dispatch<React.SetStateAction<boolean>>;
  skipCleanupProfilePic?: boolean;
  skipFetchProfileImage?: boolean;
}) => {
  const [hasError, setHasError] = useState(false);
  const initials = getInitials(name || "");
  const [fetchedImg, setFetchedImg] = useState<string | undefined>(imgSrc);

  useEffect(() => {
    if (imgSrc) {
      setFetchedImg(imgSrc);
      setHasImage?.(true);
      setHasError(false);
      setLoading(false);
      return;
    }

    if (skipFetchProfileImage) return;

    const fetchProfileImage = async () => {
      setLoading(true);
      try {
        // const res = await axiosAuthInstance.get<Blob>(
        //   "/v1/account/picture-profile",
        //   { responseType: "blob" }
        // );
        // const url = URL.createObjectURL(res.data);
        // setFetchedImg(url);
        setHasImage?.(true);
      } catch (err) {
        console.error("Failed to fetch profile image", err);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, []);

  useEffect(() => {
    return () => {
      if (skipCleanupProfilePic) return;
      if (fetchedImg) {
        URL.revokeObjectURL(fetchedImg);
      }
    };
  }, [fetchedImg, skipCleanupProfilePic]);

  return (
    <div className="relative min-w-[64px] w-[64px] h-[64px] rounded-full bg-[var(--blue-1)] flex items-center justify-center overflow-hidden">
      {loading ? (
        <Spin
          indicator={
            <LoadingOutlined
              style={{ fontSize: 24, color: "var(--blue-6)" }}
              spin
            />
          }
        />
      ) : hasError || !fetchedImg ? (
        name ? (
          <span className="absolute font-subtitle1 text-[var(--text-title)]">
            {initials}
          </span>
        ) : (
          <div className="absolute bottom-[6px]">
            <AvatarIcon fillColors="black" />
          </div>
        )
      ) : (
        <Image
          alt="profile image"
          src={fetchedImg}
          width={64}
          height={64}
          priority
          unoptimized
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setHasError(true);
          }}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
        />
      )}
    </div>
  );
};

export default ProfileImage;

interface Props {
  fillColors: string;
}

const AvatarIcon: FC<Props> = ({ fillColors = "black" }): JSX.Element => {
  return (
    <svg
      width="46"
      height="42"
      viewBox="0 0 46 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.6004 9.6C32.6004 14.9019 28.3023 19.2 23.0004 19.2C17.6985 19.2 13.4004 14.9019 13.4004 9.6C13.4004 4.29807 17.6985 0 23.0004 0C28.3023 0 32.6004 4.29807 32.6004 9.6ZM29.4004 9.6C29.4004 13.1346 26.535 16 23.0004 16C19.4658 16 16.6004 13.1346 16.6004 9.6C16.6004 6.06538 19.4658 3.2 23.0004 3.2C26.535 3.2 29.4004 6.06538 29.4004 9.6Z"
        fill={fillColors}
        fillOpacity="0.85"
      />
      <path
        d="M23.0004 24C12.6414 24 3.81523 30.1255 0.453125 38.7073C1.27216 39.5206 2.13495 40.2899 3.03765 41.0113C5.54124 33.1323 13.3951 27.2 23.0004 27.2C32.6057 27.2 40.4596 33.1323 42.9631 41.0113C43.8658 40.2899 44.7286 39.5206 45.5477 38.7073C42.1856 30.1255 33.3594 24 23.0004 24Z"
        fill={fillColors}
        fillOpacity="0.85"
      />
    </svg>
  );
};
