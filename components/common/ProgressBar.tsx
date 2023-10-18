import { Check } from "lucide-react";
import { FunctionComponent, ReactComponentElement } from "react";

type Idata = {
  id: number;
  text: string;
  title: string;
  comp?: any;
};
interface ProgressBarProps {
  data: Idata[];
  barstate: { active: number; completed: number[] };
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({
  data,
  barstate,
}) => {
  return (
    <div className="w-full h-20 flex items-center justify-center text-sm">
      {data.map((ele) => {
        return (
          <div
            className={`${
              barstate.active === ele.id
                ? "text-custom-150"
                : barstate.completed.includes(ele.id)
                ? " text-green-600"
                : " text-[#cccccc]"
            } flex flex-col w-[${
              100 / data.length
            }%] items-center justify-start`}
            key={ele.id}
          >
            <p className="px-2">{ele.title}</p>
            <div
              className={`${
                barstate.active === ele.id
                  ? "border-custom-100"
                  : barstate.completed.includes(ele.id)
                  ? " border-green-600"
                  : " border-[#cccccc]"
              } border-t-2 w-full relative m-2`}
            >
              <div
                className={`${
                  barstate.active === ele.id
                    ? "bg-custom-100"
                    : barstate.completed.includes(ele.id)
                    ? " bg-green-600"
                    : " bg-[#cccccc]"
                } flex items-center justify-center p-1 h-4 w-4 absolute -top-[10px] right-[49%] rounded-full`}
              >
                {barstate.completed.includes(ele.id) && (
                  <Check className="text-white font-bold text-xl" />
                )}
              </div>
            </div>
            <p className="px-2">{ele.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
