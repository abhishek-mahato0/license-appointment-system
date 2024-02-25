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
import { Button } from "../ui/button";

type TPopupModal = {
  btnclassNames?: string;
  children: React.ReactNode;
  btnText?: string;
  title: string;
  triggerChildren: any;
  onClick: () => void;
  triggerClick?: () => void;
  cancelFunction?: () => void;
  cancelText?: string;
  description?: string;
};

export function PopupModal({
  btnclassNames,
  children,
  btnText,
  title,
  triggerChildren,
  onClick,
  triggerClick,
  cancelFunction,
  cancelText,
  description,
}: TPopupModal) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerChildren}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={cancelFunction}
            id="close"
            className={btnclassNames ? btnclassNames : " mr-5"}
          >
            {cancelText || "close"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClick} className="">
            {btnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
