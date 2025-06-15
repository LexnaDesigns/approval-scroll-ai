
import { useState } from 'react';
import { Client } from '@/types/client';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface TextComposeModalProps {
  client: Client;
  onClose: () => void;
}

export const TextComposeModal = ({ client, onClose }: TextComposeModalProps) => {
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    {
      id: 'followup',
      name: 'Follow-up',
      content: `Hi ${client.name.split(' ')[0]}! Just checking in on your auto financing application. I have some great options available for you. When would be a good time to chat? - Canada Auto Lending`
    },
    {
      id: 'docreminder',
      name: 'Document Reminder',
      content: `Hi ${client.name.split(' ')[0]}! We're still missing a few documents to complete your application. Could you please upload them through our secure portal? The sooner we get them, the faster we can get you approved! - Canada Auto Lending`
    },
    {
      id: 'goodnews',
      name: 'Good News',
      content: `Great news ${client.name.split(' ')[0]}! I have some excellent financing options that I think you'll love. Give me a call when you have a few minutes to discuss the details. - Canada Auto Lending`
    },
    {
      id: 'checkin',
      name: 'General Check-in',
      content: `Hi ${client.name.split(' ')[0]}! Hope you're having a great day. Just wanted to touch base about your car financing needs. Any questions I can help you with? - Canada Auto Lending`
    }
  ];

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setMessage(template.content);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Here you would typically send the SMS
    console.log('Sending SMS to:', client.phone, 'Message:', message);
    
    toast({
      title: "Message Sent",
      description: `Text message sent to ${client.name}`,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-green-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Send Text Message</h3>
              <p className="text-green-100 text-sm">To: {client.name} ({client.phone})</p>
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
          {/* Templates */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Quick Templates</h4>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template)}
                  className={`text-left justify-start ${selectedTemplate === template.id ? 'border-green-500 bg-green-50' : ''}`}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Composer */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              className="w-full resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {message.length}/160 characters
              </span>
              <span className="text-xs text-gray-500">
                {Math.ceil(message.length / 160)} message(s)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Text
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
