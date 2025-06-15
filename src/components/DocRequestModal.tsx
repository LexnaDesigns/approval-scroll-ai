
import { useState } from 'react';
import { Client } from '@/types/client';
import { X, Send, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface DocRequestModalProps {
  client: Client;
  onClose: () => void;
}

export const DocRequestModal = ({ client, onClose }: DocRequestModalProps) => {
  const [sending, setSending] = useState(false);

  const handleSendPortal = async () => {
    setSending(true);
    
    // Simulate sending the document portal link
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Document Portal Sent",
      description: `Secure document portal link sent to ${client.name} via SMS`,
    });
    
    setSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-orange-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Send Document Portal</h3>
              <p className="text-orange-100 text-sm">To: {client.name}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Portal Preview */}
          <div className="mb-6">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="bg-red-500 text-white text-center py-2 px-4 rounded mb-4 animate-pulse">
                🎉 You're Pre-Approved for $45,000 – Offer expires in 48 hours
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-3">Canada Auto Lending</h4>
              <p className="text-sm text-gray-600 mb-4">
                Upload your documents securely to complete your application.
              </p>
              
              <div className="space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600">📄 Driver's License (Front + Back)</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-600">💰 Proof of Income</p>
                  <p className="text-xs text-gray-500">(2 pay stubs or 3 months bank statements)</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <p className="text-xs text-blue-800">
                    Your data is encrypted and secure. We're committed to helping you rebuild credit.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SMS Message Preview */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">SMS Message</h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                Hi {client.name.split(' ')[0]}! Your secure document portal is ready. 
                Upload your docs here: https://portal.canadaauto.ca/docs/{client.id.slice(0, 8)}
                
                🎉 You're Pre-Approved for $45,000 – Offer expires in 48 hours!
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">
                Portal expires in 48 hours for security
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={sending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendPortal}
              disabled={sending}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              {sending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Sending...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Portal Link
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
