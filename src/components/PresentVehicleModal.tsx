
import { useState, useEffect } from 'react';
import { Client } from '@/types/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Car, Upload, X, Send, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PresentVehicleModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
}

interface DecodedVin {
  Make: string;
  Model: string;
  ModelYear: string;
  [key: string]: string;
}

export const PresentVehicleModal = ({ client, isOpen, onClose }: PresentVehicleModalProps) => {
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');
  const [payment, setPayment] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedInfo, setDecodedInfo] = useState<DecodedVin | null>(null);
  const [decodingError, setDecodingError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleVinDecode = async () => {
    if (vin.length < 11) {
      setDecodingError('Please enter a valid VIN (at least 11 characters).');
      return;
    }
    setIsDecoding(true);
    setDecodingError(null);
    setDecodedInfo(null);
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`);
      if (!response.ok) {
        throw new Error('Failed to fetch VIN data.');
      }
      const data = await response.json();
      
      if (!data.Results || data.Results.length === 0) {
        throw new Error('Invalid VIN or no data found.');
      }

      const vehicleData = data.Results[0];

      const info: DecodedVin = {
        Make: vehicleData.Make,
        Model: vehicleData.Model,
        ModelYear: vehicleData.ModelYear,
      };

      if (!info.Make || !info.Model || !info.ModelYear) {
        const error = (vehicleData.ErrorText || 'Could not decode vehicle details. Please check VIN.').split(';')[0];
        throw new Error(error);
      }
      
      setDecodedInfo(info);
      toast({ title: 'VIN Decoded!', description: `${info.ModelYear} ${info.Make} ${info.Model}` });
    } catch (error: any) {
      setDecodingError(error.message || 'An error occurred during VIN decoding.');
      toast({ title: 'VIN Decoding Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsDecoding(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
        const urlToRemove = prev[index];
        const newPreviews = prev.filter((_, i) => i !== index);
        URL.revokeObjectURL(urlToRemove);
        return newPreviews;
    });
  };

  const resetState = () => {
    setVin('');
    setMileage('');
    setPayment('');
    setIsDecoding(false);
    setDecodedInfo(null);
    setDecodingError(null);
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    setImages([]);
    setImagePreviews([]);
    onClose();
  };
  
  const handleSendText = () => {
    toast({ title: "Functionality Coming Soon", description: "I'll enable sending vehicle presentations via text next, including the image uploads!" });
  };
  
  const handleSendEmail = () => {
    toast({ title: "Functionality Coming Soon", description: "I'll enable sending vehicle presentations via email next, including the image uploads!" });
  };
  
  useEffect(() => {
    return () => {
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetState()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Present Vehicle to {client?.name}</DialogTitle>
          <DialogDescription>
            Decode a VIN, add vehicle details, and send a presentation to the client.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="vin">Vehicle Identification Number (VIN)</Label>
            <div className="flex gap-2">
              <Input id="vin" value={vin} onChange={e => setVin(e.target.value.toUpperCase())} placeholder="Enter vehicle VIN" />
              <Button onClick={handleVinDecode} disabled={isDecoding || !vin}>
                {isDecoding ? <Loader2 className="animate-spin" /> : 'Decode'}
              </Button>
            </div>
            {decodingError && <p className="text-sm text-red-500 mt-1">{decodingError}</p>}
          </div>

          {decodedInfo && (
            <div className="p-4 bg-gray-100 rounded-lg border animate-fade-in">
              <h4 className="font-semibold text-lg flex items-center gap-2 mb-2"><Car /> Vehicle Details</h4>
              <p><strong>Year:</strong> {decodedInfo.ModelYear}</p>
              <p><strong>Make:</strong> {decodedInfo.Make}</p>
              <p><strong>Model:</strong> {decodedInfo.Model}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input id="mileage" type="number" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="e.g., 50000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment">Bi-weekly Payment ($)</Label>
              <Input id="payment" type="number" value={payment} onChange={e => setPayment(e.target.value)} placeholder="e.g., 250" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Vehicle Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">Multiple images can be selected</p>
              </label>
              <Input id="image-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative group animate-scale-in">
                    <img src={src} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-lg" />
                    <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-between items-center pt-4">
          <Button variant="outline" onClick={resetState}>Cancel</Button>
          <div className="flex gap-2">
             <Button onClick={handleSendText} disabled={!decodedInfo || !mileage || !payment || images.length === 0}>
                <Send className="mr-2" /> Send as Text
             </Button>
             <Button onClick={handleSendEmail} disabled={!decodedInfo || !mileage || !payment || images.length === 0}>
                <Mail className="mr-2" /> Send as Email
             </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
