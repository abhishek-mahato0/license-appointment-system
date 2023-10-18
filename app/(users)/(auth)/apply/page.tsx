"use client";
import React, { useState } from "react";
import TermsConditions from "./_components/TermsConditions";
import ProgressBar from "@/components/common/ProgressBar";
import { applyProgressData } from "@/components/data/ApplyProgressBarData";
import Category from "@/components/common/Category/Category";

export default function page() {
  const [checked, setCheckecd] = useState(false);
  const [barstate, setBarstate] = useState({
    active: 1,
    completed: [],
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-5 gap-10">
      <h1 className=" w-full text-xl text-custom-150 font-bold">
        Apply For New License
      </h1>
      <div className=" w-[80%] h-[90%] gap-5 flex flex-col bg-custom-50 p-5 rounded-sm shadow-sm">
        <ProgressBar data={applyProgressData} barstate={barstate} />
        {barstate.active === 1 && (
          <TermsConditions
            checked={checked}
            setChecked={setCheckecd}
            setBarstate={setBarstate}
          />
        )}
        {barstate.active === 2 && <Category />}
      </div>
    </div>
  );
}
