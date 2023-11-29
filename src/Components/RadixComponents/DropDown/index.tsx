import { Button, DropdownMenu } from "@radix-ui/themes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { FunctionComponent } from "react";
import LinkBtn from "@/Components/Common/Link/LinkBtn";
type options = {
  name: string;
  path?: string;
  id?: number;
  icon?: any;
};
interface DropDownProps {
  name: string;
  options: options[];
}

const DropDown: FunctionComponent<DropDownProps> = ({ name, options }) => {
  return (
    <div className=" w-fit cursor-pointer">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="flex items-center justify-center gap-2">
            {name}
            <CaretDownIcon width="12" height="12" />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content variant="solid" highContrast>
          {options.map((ele) => (
            <DropdownMenu.Item key={ele.id} className=" hover:bg-blue-300">
              <LinkBtn
                name={ele.name}
                path={`${ele?.path ? ele.path : ""} `}
                className=" hover:border-b-0 hover:text-white"
              ></LinkBtn>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default DropDown;
