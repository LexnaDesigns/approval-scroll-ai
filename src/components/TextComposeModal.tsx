
import { useState } from 'react';
import { Client } from '@/types/client';
import { X, Send, Sparkles } from 'lucide-react';
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

  const aiTemplates = [
    {
      id: 'ai_followup',
      name: '🤖 AI Follow-up',
      content: `Hi ${client.name.split(' ')[0]}! Our AI system analyzed your profile and found 3 pre-approved offers with rates as low as ${client.creditScore >= 650 ? '4.9%' : client.creditScore >= 580 ? '8.9%' : '12.9%'}. Ready to see your personalized options? - Canada Auto Lending`
    },
    {
      id: 'ai_smart_reminder',
      name: '🧠 Smart Doc Reminder', 
      content: `${client.name.split(' ')[0]}, our AI noticed you're missing ${!client.documents.income ? 'income verification' : 'driver license'}. Upload it in 60 seconds via this link and get instant pre-approval! 🚀 [Upload Link] - Canada Auto Lending`
    },
    {
      id: 'ai_predictive',
      name: '🔮 Predictive Approval',
      content: `Great news ${client.name.split(' ')[0]}! Our AI predicts ${client.creditScore >= 650 ? '95%' : client.creditScore >= 580 ? '87%' : '73%'} approval chance for you. I have 4 lenders competing for your business right now. Call me in the next hour to lock in the best rate! - Canada Auto Lending`
    },
    {
      id: 'ai_market_alert',
      name: '📈 Market Alert',
      content: `${client.name.split(' ')[0]}, URGENT: Interest rates dropping this week! Our AI found you ${client.creditScore >= 650 ? '$2,400' : client.creditScore >= 580 ? '$1,800' : '$1,200'} in potential savings. Limited time - let's lock this in today! - Canada Auto Lending`
    },
    {
      id: 'ai_behavioral',
      name: '🎯 Behavior-Based',
      content: `Hi ${client.name.split(' ')[0]}! Our AI noticed you've been researching ${client.creditScore >= 650 ? 'luxury sedans' : client.creditScore >= 580 ? 'SUVs' : 'reliable compacts'}. I found 3 perfect matches in your budget with financing available. Want to see them? - Canada Auto Lending`
    },
    {
      id: 'traditional',
      name: '👤 Traditional Follow-up',
      content: `Hi ${client.name.split(' ')[0]}! Just checking in on your auto financing application. I have some great options available for you. When would be a good time to chat? - Canada Auto Lending`
    }
  ];

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setMessage(template.content);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    console.log('Sending SMS to:', client.phone, 'Message:', message);
    
    toast({
      title: "✅ AI Message Sent",
      description: `Smart text sent to ${client.name} - AI will track engagement`,
      duration: 4000,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                AI-Powered Messaging
              </h3>
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
          {/* AI Templates */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
              AI-Generated Templates
            </h4>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {aiTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template)}
                  className={`text-left justify-start h-auto py-2 px-3 ${selectedTemplate === template.id ? 'border-blue-500 bg-blue-50' : ''}`}
                >
                  <span className="text-xs font-medium">{template.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Message Composer */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message Preview
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Select an AI template above or write your own message..."
              rows={5}
              className="w-full resize-none text-sm"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {message.length}/160 characters
              </span>
              <span className="text-xs text-blue-600">
                AI will track opens & responses
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
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send with AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
