"use client";
import Image from "next/image";
import React from "react";
import CategoryCard from "./Card";
import { categoryData } from "@/components/data/CategoryData";
import FullFlex from "../Fullflex";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { setBarstate } from "@/redux/slices/applynewSlice";
import { useRouter } from "next/navigation";

function Category() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedCat } = useAppSelector((state) => state.applynew);
  return (
    <div className="p-2">
      <h1 className=" font-bold text-custom-150 text-xl mb-4">
        Select Category
      </h1>
      <div className="flex flex-col md:grid lg:grid-cols-4 md:grid-cols-3 gap-5">
        {categoryData.map((ele) => {
          return <CategoryCard data={ele} />;
        })}
      </div>
      <FullFlex className=" justify-end mt-4">
        <Button
          disabled={!selectedCat}
          onClick={() => {
            dispatch(setBarstate({ active: 3, completed: [1, 2] }));
            router.push("/apply/3");
          }}
        >
          Next
        </Button>
      </FullFlex>
    </div>
  );
}

export default Category;
