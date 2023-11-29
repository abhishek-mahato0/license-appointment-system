import { FunctionComponent } from "react";
import FullFlex from "../Fullflex";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { setSelectedCat } from "@/redux/slices/applynewSlice";
import { Check } from "lucide-react";

export interface CategoryCardProps {
  data: {
    id: number;
    name: string;
    category: string;
    src: string;
  };
}

const CategoryCard: FunctionComponent<CategoryCardProps> = ({ data }) => {
  const { selectedCat } = useAppSelector((state) => state.applynew);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${
        selectedCat == data.category
          ? "bg-custom-100 text-white scale-105"
          : "hover:text-white hover:bg-custom-150 gap-2 hover:scale-105"
      } group flex flex-col border-[1px] border-custom-100 rounded-[8px] p-4 justify-between cursor-pointer`}
      onClick={() => dispatch(setSelectedCat(data.category))}
    >
      <div className=" flex justify-between items-center">
        <p>{data.category}</p>
        <div
          className={`h-5 w-5 rounded-full border-[1px] border-black flex items-center justify-center p-1 ${
            selectedCat != data.category
              ? "group-hover:bg-white"
              : " bg-green-600"
          }`}
        >
          {selectedCat == data.category && <Check color="white" />}
        </div>
      </div>
      <FullFlex>
        <Image src={data.src} height={70} width={70} alt={data.category} />
      </FullFlex>
      <FullFlex className=" text-sm text-center font-semibold">
        {data.name}
      </FullFlex>
    </div>
  );
};
export default CategoryCard;
