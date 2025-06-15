
import { useState } from 'react';
import { Client } from '@/types/client';
import { X, Send, Sparkles, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface EmailComposeModalProps {
  client: Client;
  onClose: () => void;
}

export const EmailComposeModal = ({ client, onClose }: EmailComposeModalProps) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const aiEmailTemplates = [
    {
      id: 'ai_approval_ready',
      name: '🎉 AI Approval Package',
      subject: `${client.name.split(' ')[0]}, Your Pre-Approval is Ready! (${client.creditScore >= 650 ? 'Premium' : client.creditScore >= 580 ? 'Standard' : 'Flexible'} Rates Inside)`,
      content: `Dear ${client.name},

🎉 Congratulations! Our AI has successfully pre-approved your auto loan application.

📊 YOUR PERSONALIZED RESULTS:
• Credit Score: ${client.creditScore}
• Approval Amount: Up to $${client.creditScore >= 650 ? '45,000' : client.creditScore >= 580 ? '35,000' : '25,000'}
• Interest Rate: As low as ${client.creditScore >= 650 ? '4.9%' : client.creditScore >= 580 ? '8.9%' : '12.9%'} APR
• Monthly Payment: Starting at $${client.creditScore >= 650 ? '299' : client.creditScore >= 580 ? '399' : '499'}

🤖 AI FOUND THESE BENEFITS FOR YOU:
✓ No hidden fees
✓ Flexible payment options
✓ Same-day funding available
✓ 30-day rate lock guarantee

Ready to see your full options? Reply to this email or call me directly.

Best regards,
Your Finance Team
Canada Auto Lending`
    },
    {
      id: 'ai_document_smart',
      name: '📋 Smart Document Request',
      subject: `Quick Upload Needed - AI Detected Missing Items for ${client.name.split(' ')[0]}`,
      content: `Hi ${client.name},

Our AI system has reviewed your application and detected that we're missing just ${!client.documents.income && !client.documents.license ? '2 documents' : '1 document'} to complete your approval:

${!client.documents.income ? '❌ Recent pay stub or income verification' : ''}
${!client.documents.license ? '❌ Driver\'s license (front & back)' : ''}

🚀 GOOD NEWS: Our AI estimates your approval will process within 2 hours once we receive these!

📱 Upload securely here: [Secure Upload Link]
⏰ Or text them to: (555) 123-4567

Questions? Just reply to this email - I'm here to help!

Best,
Your Finance Specialist
Canada Auto Lending`
    },
    {
      id: 'ai_market_insights',
      name: '📈 Market Intelligence Report',
      subject: `${client.name.split(' ')[0]}, Exclusive Market Report: Save $${client.creditScore >= 650 ? '2,400' : client.creditScore >= 580 ? '1,800' : '1,200'} This Week`,
      content: `${client.name},

Our AI market analysis shows significant rate drops this week. Here's your personalized opportunity:

📊 MARKET INSIGHTS FOR YOUR PROFILE:
• Rates dropped 0.8% in your credit tier
• 73% fewer applications in your range
• Lenders offering incentives through Friday

💰 YOUR POTENTIAL SAVINGS:
• Old rate estimate: ${client.creditScore >= 650 ? '6.9%' : client.creditScore >= 580 ? '10.9%' : '14.9%'} APR
• New rate available: ${client.creditScore >= 650 ? '4.9%' : client.creditScore >= 580 ? '8.9%' : '12.9%'} APR
• Monthly savings: $${client.creditScore >= 650 ? '89' : client.creditScore >= 580 ? '67' : '45'}
• Total savings: $${client.creditScore >= 650 ? '2,400' : client.creditScore >= 580 ? '1,800' : '1,200'}

⏰ This opportunity expires Friday. Let's lock in your rate today!

Call me: (555) 123-4567
Or reply to schedule a 10-minute call.

Best regards,
Canada Auto Lending AI Team`
    },
    {
      id: 'traditional_followup',
      name: '👤 Traditional Follow-up',
      subject: `Following up on your auto loan application`,
      content: `Dear ${client.name},

I hope this email finds you well. I wanted to follow up on your recent auto loan application with us.

I have some competitive financing options that I believe would be a great fit for your needs. When would be a convenient time for us to discuss the details?

Please feel free to call me at (555) 123-4567 or reply to this email with your availability.

Thank you for considering Canada Auto Lending for your financing needs.

Best regards,
Your Finance Specialist`
    }
  ];

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setSubject(template.subject);
    setMessage(template.content);
  };

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) return;
    
    console.log('Sending Email to:', client.email, 'Subject:', subject, 'Message:', message);
    
    toast({
      title: "📧 AI Email Sent",
      description: `Intelligent email sent to ${client.name} - tracking opens & clicks`,
      duration: 4000,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                AI Email Composer
              </h3>
              <p className="text-purple-100 text-sm">To: {client.name} ({client.email || 'client@example.com'})</p>
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
              <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
              AI Email Templates
            </h4>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              {aiEmailTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template)}
                  className={`text-left justify-start h-auto py-2 px-3 ${selectedTemplate === template.id ? 'border-purple-500 bg-purple-50' : ''}`}
                >
                  <span className="text-xs font-medium">{template.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Subject Line */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Line
            </label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject..."
              className="w-full"
            />
          </div>

          {/* Message Composer */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Content
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Select an AI template above or write your own email..."
              rows={12}
              className="w-full resize-none text-sm font-mono"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {message.length} characters
              </span>
              <span className="text-xs text-purple-600">
                AI will optimize send time & track engagement
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
              disabled={!subject.trim() || !message.trim()}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
