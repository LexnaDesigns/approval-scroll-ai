
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Client } from '@/types/client';

const KILL_REASONS = [
  { emoji: "👻", label: "Ghosted" },
  { emoji: "💳", label: "Bad Credit" },
  { emoji: "📄", label: "No Docs" },
  { emoji: "👥", label: "No Cosigner" },
  { emoji: "🤯", label: "Just a Headache" },
];

interface KillReasonModalProps {
  isOpen: boolean;
  client: Client | null;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}

export const KillReasonModal = ({ isOpen, client, onConfirm, onCancel }: KillReasonModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  React.useEffect(() => {
    if (!isOpen) setSelected(null);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={v => !v && onCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Kill Lead: {client?.name}</DialogTitle>
        </DialogHeader>
        <div className="my-6 space-y-2">
          <p className="mb-2 text-gray-700 font-medium text-base">Why are you killing?</p>
          <div className="space-y-2">
            {KILL_REASONS.map(reason => (
              <button
                key={reason.label}
                onClick={() => setSelected(reason.label)}
                className={`flex items-center w-full px-4 py-3 border rounded-xl text-lg font-medium transition-all
                  ${selected === reason.label ? 'bg-red-100 border-red-300' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                type="button"
              >
                <span className="text-2xl mr-3">{reason.emoji}</span>
                <span>{reason.label}</span>
              </button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={!selected}
            onClick={() => {
              if (selected) onConfirm(selected);
            }}
          >
            Kill Lead
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
