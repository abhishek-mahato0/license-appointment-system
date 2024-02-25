import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function OTPModal({
  otp,
  setOtp,
}: {
  otp: string;
  setOtp: (otp: string) => void;
}) {
  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span className=" mx-8">-</span>}
      renderInput={(props) => (
        <input
          {...props}
          className=" p-1 h-12 flex items-center justify-center content-center text-xl text-custom-150 font-bold outline-custom-150"
          style={{
            width: "3.5rem",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        />
      )}
    />
  );
}
