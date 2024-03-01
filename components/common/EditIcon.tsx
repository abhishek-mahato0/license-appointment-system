import { Pencil } from "lucide-react";
import React from "react";

const EditIcon = () => {
  return (
    <Pencil
      size={20}
      className="hover:text-custom-150 text-gray-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
    />
  );
};

export default EditIcon;
