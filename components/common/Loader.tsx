import React from "react";
import { ThreeDots } from "react-loader-spinner";

type ILoader = {
  width?: string;
  height?: string;
  radius?: string;
  color?: string;
};
export default function Loader({
  width = "100",
  height = "100",
  color = "#0388f8",
  radius = "80",
}: ILoader) {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius={radius}
      color={color}
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
}
