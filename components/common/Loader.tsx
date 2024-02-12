import React from "react";
import { TailSpin, ThreeDots, Vortex } from "react-loader-spinner";

type ILoader = {
  width?: string;
  height?: string;
  radius?: string;
  color?: string;
  type?: "dots" | "spinner";
};
export default function Loader({
  width = "100",
  height = "100",
  color = "#0388f8",
  radius = "80",
  type = "dots",
}: ILoader) {
  return (
    <>
      {type == "dots" ? (
        <ThreeDots
          height={height}
          width={width}
          radius={radius}
          color={color}
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        <TailSpin
          visible={true}
          height={height}
          width={width}
          color={color}
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      )}
    </>
  );
}
