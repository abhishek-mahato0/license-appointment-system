"use client";
import FullFlex from "@/components/common/Fullflex";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { setBarstate, setIsAgreed } from "@/redux/slices/applynewSlice";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TermsConditions() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isTermsAgreed } = useAppSelector((state) => state.applynew);

  return (
    <div className="w-full h-full space-y-4">
      <h2 className=" text-custom-150 font-bold text-[16px]">
        Terms And Conditions
      </h2>
      <div className=" flex flex-col text-start text-sm gap-2">
        <p>
          I, solemnly declare that all the information provided on this website
          is true, accurate, and complete to the best of my knowledge and
          belief. I understand that any false or misleading information may
          result in the rejection of my application or legal consequences.
        </p>
        <p>
          We are dedicated to providing reliable and efficient services to our
          users. While we make every effort to ensure the availability and
          accessibility of our services through this portal, we acknowledge that
          unforeseen technical issues or maintenance activities may occasionally
          disrupt service. We strive to minimize such disruptions and appreciate
          your patience and understanding in such circumstances.
        </p>
        <p>
          Protecting the privacy and security of your personal information is a
          top priority for us. We adhere to strict security measures and
          industry best practices to safeguard your data against unauthorized
          access, disclosure, alteration, or destruction. We collect and process
          your personal information in accordance with applicable laws and
          regulations, and our Privacy Policy outlines our practices regarding
          the collection, use, storage, and sharing of your data. By using our
          services, you consent to the collection and processing of your
          personal information as described in our Privacy Policy.
        </p>
        <p>
          Our commitment to transparency extends beyond data privacy. We are
          dedicated to providing clear and accurate information about our
          services, terms of use, and policies to ensure that our users can make
          informed decisions. If you have any questions, concerns, or feedback
          regarding our services or policies, please don't hesitate to contact
          us. We value your input and are always here to assist you.
        </p>
        <p>
          By accessing or using this website, you agree to abide by these terms
          and conditions and acknowledge that your use of our services is
          subject to compliance with applicable laws and regulations. We reserve
          the right to modify, amend, or update these terms and conditions at
          any time without prior notice. It is your responsibility to review
          these terms periodically for changes. Your continued use of our
          services following the posting of any changes constitutes acceptance
          of those changes.
        </p>
      </div>
      <FullFlex className=" space-x-2 items-start justify-start border-t-2 py-4 text-sm">
        <Checkbox
          id="terms"
          onClick={() => dispatch(setIsAgreed(true))}
          checked={isTermsAgreed}
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
          disabled={!isTermsAgreed}
          onClick={() => {
            router.push("/apply/2");
          }}
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
