import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

  interface PopoverProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (isDialogOpen: boolean) => void;
    handleAlertDialogOk: () => void;
    alertTitle: string;
    alertDescription: string;
    showCancelButton: boolean;
  }
const Popover: React.FC<PopoverProps> = ({isDialogOpen, setIsDialogOpen, handleAlertDialogOk, alertTitle, alertDescription, showCancelButton}) => {
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
        <AlertDialogDescription>
        {alertDescription}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className='flex items-center gap-3'>
        {showCancelButton && <AlertDialogCancel>Cancel</AlertDialogCancel>}
        <AlertDialogAction className='text-white' onClick={handleAlertDialogOk}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default Popover