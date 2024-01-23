import React from "react";
import { useForm } from "react-hook-form";

export default function PersonalForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex items-center justify-between">
        <input {...register("firstName")} placeholder="First Name" />
        <input {...register("middleName")} placeholder="Middle Name" />
        <input {...register("lastName")} placeholder="Last Name" />
      </div>
      <div className=" flex items-center justify-between">
        <input {...register("dob")} placeholder="Date of Birth" type="date" />
        <select {...register("bloodGroup")}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          {/* Add other blood groups */}
        </select>
        <select {...register("gender")}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className=" flex items-center justify-between">
        <input {...register("guardianName")} placeholder="Guardian Name" />
        <select {...register("relation")}>
          <option value="">Select Relation</option>
          <option value="father">Father</option>
          <option value="mother">Mother</option>
        </select>
      </div>
      <input type="submit" />
    </form>
  );
}
