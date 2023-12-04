import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { FunctionComponent, ReactComponentElement } from "react";

interface AlertComponentProps {
  TriggerComp: any;
  title: string;
  desc: string;
  cancel: string;
  action: string;
  onClick: () => void;
  className: string;
}

const AlertComponent: FunctionComponent<AlertComponentProps> = ({
  TriggerComp,
  title,
  desc,
  cancel,
  action,
  onClick,
  className,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{TriggerComp}</AlertDialogTrigger>
      <AlertDialogContent className=" bg-custom-150 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onClick} className={className}>
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertComponent;
