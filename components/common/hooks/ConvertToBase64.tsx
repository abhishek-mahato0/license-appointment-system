import { useState } from "react";

export const convertToBase64 = async (file: File) => {
  const [front, setFront] = useState<any>(null);
  console.log(file);
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    setFront(fileReader.result as string);
  };
  fileReader.onerror = (error) => {
    setFront(null);
  };
  return front;
};
