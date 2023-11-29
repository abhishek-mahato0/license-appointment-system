import { FunctionComponent } from "react";
import Button from "../Common/Button";
import DropDown from "../RadixComponents/DropDown";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const dropOptions = [
    {
      id: 1,
      name: "Apply For New License",
      path: "/new",
    },
    {
      id: 2,
      name: "Renew License",
      path: "/renew",
    },

    {
      id: 3,
      name: "Prepre For Exams",
      path: "/contents",
    },
  ];
  return (
    <div className=" w-full px-3 py-2 h-fit flex gap-4 items-center justify-center">
      <Button text="Login" className="rounded-md" />
      <DropDown name="Services" options={dropOptions} />
    </div>
  );
};

export default Navbar;
