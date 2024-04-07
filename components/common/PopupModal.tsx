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
  isHidden?: boolean;
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
  isHidden = false,
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
            className={`
              ${
                btnclassNames
                  ? btnclassNames
                  : isHidden
                  ? " mr-[80px]"
                  : " mr-[15px]"
              }
              hover:border-red-500 hover:text-red-500
            `}
          >
            {cancelText || "close"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className={`${isHidden ? "hidden" : " "}`}
          >
            {btnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
