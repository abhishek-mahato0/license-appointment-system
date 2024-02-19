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
  btnText: string;
  title: string;
  triggerText: string;
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
  triggerText,
  onClick,
  triggerClick,
  cancelFunction,
  cancelText,
  description,
}: TPopupModal) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={btnclassNames}
          onClick={triggerClick}
          id="popover"
        >
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelFunction}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>{btnText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
