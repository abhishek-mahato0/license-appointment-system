import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type TDeleteModal = {
  title: string;
  children: React.ReactNode;
  onDelete: () => void;
};
export default function DeleteModal({
  children,
  onDelete,
  title,
}: TDeleteModal) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" gap-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className=" text-red-500 font-semibold">
            Are you sure you want to {title}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
