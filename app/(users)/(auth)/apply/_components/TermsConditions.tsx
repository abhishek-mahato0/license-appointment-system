"use client";
import FullFlex from "@/components/common/Fullflex";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

export default function TermsConditions({
  checked,
  setChecked,
  setBarstate,
}: {
  checked: boolean;
  setChecked: (value: boolean) => void;
  setBarstate: any;
}) {
  return (
    <div className="w-full h-full space-y-4">
      <h2 className=" text-custom-150 font-bold text-[16px]">
        Terms And Conditions
      </h2>
      <div className=" flex flex-col text-start text-sm gap-1">
        <p>I hereby claim that the details providsed are authentic.</p>
        <p>
          We make every effort to ensure that the services provided through this
          Portal are available and accessible. However, we do not guarantee
          uninterrupted or error-free service.
        </p>
        <p>
          We are committed to protecting your privacy and data security. Please
          refer to our Privacy Policy for details on how we handle your personal
          information.
        </p>
      </div>
      <FullFlex className=" space-x-2 items-start justify-start border-t-2 py-4 text-sm">
        <Checkbox
          id="terms"
          onClick={() => setChecked(!checked)}
          checked={checked}
        />
        <label htmlFor="terms">
          I have read and agreed to the mentioned terms and confitions for
          applying for a new license. I will be liable for any conduct mentioned
          in the terms and confitions.
        </label>
      </FullFlex>
      <div className="w-full flex items-end justify-end">
        <Button
          className=" rounded-sm"
          disabled={!checked}
          onClick={() => setBarstate({ active: 2, completed: [1] })}
        >
          Next
          <p>
            <ChevronRight width={17} />
          </p>
        </Button>
      </div>
    </div>
  );
}
