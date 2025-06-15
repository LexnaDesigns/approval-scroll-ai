
import { useState } from 'react';
import { Client } from '@/types/client';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface EmailComposeModalProps {
  client: Client;
  onClose: () => void;
}

export const EmailComposeModal = ({ client, onClose }: EmailComposeModalProps) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    {
      id: 'welcome',
      name: 'Welcome Email',
      subject: 'Welcome to Canada Auto Lending - Your Application is Being Processed',
      content: `Dear ${client.name},\n\nThank you for choosing Canada Auto Lending for your automotive financing needs. We're excited to help you get into your next vehicle!\n\nYour application is currently being reviewed by our team. We'll be in touch within 24 hours with next steps.\n\nIf you have any questions in the meantime, please don't hesitate to reach out.\n\nBest regards,\nCanada Auto Lending Team`
    },
    {
      id: 'docs_needed',
      name: 'Documents Needed',
      subject: 'Action Required: Additional Documents Needed for Your Auto Loan',
      content: `Dear ${client.name},\n\nWe're making great progress on your auto loan application! To complete the process, we need a few additional documents:\n\n• Driver's License (front and back)\n• Recent pay stubs or proof of income\n• Bank statements (last 2 months)\n\nYou can securely upload these documents through our portal. This helps us expedite your approval.\n\nThank you for your cooperation!\n\nBest regards,\nCanada Auto Lending Team`
    },
    {
      id: 'approval',
      name: 'Approval Notification',
      subject: '🎉 Congratulations! Your Auto Loan Has Been Approved',
      content: `Dear ${client.name},\n\nWe're thrilled to inform you that your auto loan application has been APPROVED!\n\nNext steps:\n1. Review your loan terms (attached)\n2. Schedule your vehicle delivery\n3. Complete final paperwork\n\nOur team will contact you within the next few hours to coordinate the details.\n\nCongratulations on your approval!\n\nBest regards,\nCanada Auto Lending Team`
    },
    {
      id: 'followup',
      name: 'Follow-up',
      subject: 'Checking In on Your Auto Financing Application',
      content: `Dear ${client.name},\n\nI hope this email finds you well. I wanted to personally follow up on your auto financing application with Canada Auto Lending.\n\nWe're committed to finding the right financing solution for your needs. If you have any questions or concerns, I'm here to help.\n\nPlease feel free to call or email me directly.\n\nLooking forward to hearing from you soon!\n\nBest regards,\nCanada Auto Lending Team`
    }
  ];

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setSubject(template.subject);
    setMessage(template.content);
  };

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) return;
    
    // Here you would typically send the email
    console.log('Sending email to:', client.email, 'Subject:', subject, 'Message:', message);
    
    toast({
      title: "Email Sent",
      description: `Email sent to ${client.name}`,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Compose Email</h3>
              <p className="text-purple-100 text-sm">To: {client.name} ({client.email})</p>
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

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Templates */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Email Templates</h4>
            <div className="grid grid-cols-2 gap-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template)}
                  className={`text-left justify-start ${selectedTemplate === template.id ? 'border-purple-500 bg-purple-50' : ''}`}
                >
                  {template.name}
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
              Message
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your email message here..."
              rows={12}
              className="w-full resize-none"
            />
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
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
