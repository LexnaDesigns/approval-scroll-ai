
import { useState } from 'react';
import { Client } from '@/types/client';
import { X, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface CloseDealModalProps {
  client: Client;
  onClose: () => void;
  onComplete: (clientId: string) => void;
}

export const CloseDealModal = ({ client, onClose, onComplete }: CloseDealModalProps) => {
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');
  const [finalPayment, setFinalPayment] = useState('');
  const [lender, setLender] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const lenders = [
    'AutoCapital Canada',
    'BNC (National Bank of Canada)',
    'CIBC',
    'Desjardins',
    'EdenPark',
    'iA Auto Finance',
    'Iceberg Finance',
    'LendCare',
    'NorthLake Financial',
    'OCM Auto Financing',
    'RBC',
    'Santander Consumer',
    'SDA',
    'TD Auto Finance'
  ];

  const handleComplete = () => {
    if (!vin || !mileage || !finalPayment || !lender || !deliveryDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to complete the deal.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save the deal completion data
    console.log('Completing deal:', {
      clientId: client.id,
      vin,
      mileage,
      finalPayment,
      lender,
      deliveryDate
    });

    toast({
      title: "Deal Closed! 🎉",
      description: `Successfully closed deal for ${client.name}`,
    });

    onComplete(client.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-green-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Close Deal</h3>
              <p className="text-green-100 text-sm">Complete delivery for {client.name}</p>
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
          <div className="space-y-4">
            {/* VIN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                VIN Number
              </label>
              <Input
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                placeholder="Enter 17-digit VIN"
                maxLength={17}
                className="w-full"
              />
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mileage
              </label>
              <Input
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Enter current mileage"
                type="number"
                className="w-full"
              />
            </div>

            {/* Final Payment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Final Payment Amount
              </label>
              <Input
                value={finalPayment}
                onChange={(e) => setFinalPayment(e.target.value)}
                placeholder="$0.00"
                type="number"
                step="0.01"
                className="w-full"
              />
            </div>

            {/* Lender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lender
              </label>
              <Select value={lender} onValueChange={setLender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select lender" />
                </SelectTrigger>
                <SelectContent>
                  {lenders.map((lenderName) => (
                    <SelectItem key={lenderName} value={lenderName}>
                      {lenderName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Delivery Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Date
              </label>
              <Input
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                type="date"
                className="w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleComplete}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Deal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
