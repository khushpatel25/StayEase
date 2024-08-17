import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import {Button} from '@src/src/components/ui/button';

interface ConfirmationPromptProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (propertyId: number | null) => void;
  propertyId: number | null;
}

const ConfirmationPrompt: React.FC<ConfirmationPromptProps> = ({
  open,
  onClose,
  onConfirm,
  propertyId,
}) => {
  const handleConfirm = () => {
    if (propertyId !== null) {
      onConfirm(propertyId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete?</p>
      </DialogContent>
      <DialogFooter>
        <Button onClick={onClose}>No</Button>
        <Button onClick={handleConfirm} color="primary">
          Yes
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmationPrompt;
