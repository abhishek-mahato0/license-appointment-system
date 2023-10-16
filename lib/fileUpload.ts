import {Cloudinary} from "@cloudinary/url-gen";
import axios from "axios";
import { useState } from "react";

export const fileUpload = async(file:any)=>{
    <FullFlex className=" flex-col justify-start">
            <input
              {...register("avatar", {
                required: true,
                validate: {
                  maxSize: (value) => {
                    if (value[0].size > 1048576) {
                      return "File size must be less than 1MB";
                    }
                    return true;
                  },
                  allowedTypes: (value) => {
                    const allowedTypes = [
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                    ]; // Define your allowed file types
                    if (!allowedTypes.includes(value[0].type)) {
                      return "File type not allowed";
                    }
                    return true;
                  },
                },
              })}
              type="file"
              className="w-full"
            />
            {errors?.avatar && (
              <p className=" text-xs text-red-600 w-full">
                {errors.avatar?.type === "required"
                  ? "Please attach an avatar"
                  : errors?.avatar?.message?.toString()}
              </p>
            )}
          </FullFlex>
    const [uploadres,setUploadres]=useState({
        error:"",
        url:""
    })
    console.log(file)
    const formdata = new FormData();
    formdata.append("file",file);
    formdata.append("upload_preset", process.env.CLOUDINARY_UPLOAD as string);
    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`, formdata)
        console.log(res)
    } catch (error:any) {
        setUploadres({...uploadres, error:error?.message})
    } 
    return {uploadres};
};
