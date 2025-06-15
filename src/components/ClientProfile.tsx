
import { Client } from '@/types/client';
import { X, Phone, MessageSquare, Mail, FileText, Target, CheckCircle, Skull, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ClientProfileProps {
  client: Client;
  onClose: () => void;
  onAction: (client: Client, action: string) => void;
  onUpdateStage: (clientId: string, newStage: string) => void;
}

export const ClientProfile = ({ client, onClose, onAction, onUpdateStage }: ClientProfileProps) => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'New Lead': return 'bg-blue-500';
      case 'Docs In': return 'bg-yellow-500';
      case 'Presenting Options': return 'bg-purple-500';
      case 'Funding': return 'bg-orange-500';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 650) return 'text-green-600';
    if (score >= 550) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {client.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{client.name}</h2>
                <p className={`font-semibold text-lg ${getCreditScoreColor(client.creditScore) === 'text-green-600' ? 'text-green-200' : getCreditScoreColor(client.creditScore) === 'text-yellow-600' ? 'text-yellow-200' : 'text-red-200'}`}>
                  Credit Score: {client.creditScore}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={`${getStageColor(client.stage)} text-white px-4 py-2 text-sm`}>
                {client.stage}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(90vh-200px)]">
          {/* Left Panel - Client Info */}
          <div className="w-1/2 p-6 border-r border-gray-200">
            <ScrollArea className="h-full">
              {/* AI Summary */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">AI Credit Summary</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
                  {client.fullAiSummary}
                </p>
              </div>

              {/* Contact Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{client.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{client.address}</span>
                  </div>
                </div>
              </div>

              {/* Employment Info */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Employment Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-gray-700 font-medium">{client.jobTitle}</p>
                      <p className="text-gray-600 text-sm">{client.employer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">${client.monthlyIncome.toLocaleString()}/month</span>
                  </div>
                </div>
              </div>

              {/* Document Gallery */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Documents</h3>
                <div className="grid grid-cols-3 gap-3">
                  {client.documents.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                      <FileText className="h-8 w-8 text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              {client.alerts.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Alerts</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.alerts.map((alert, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {alert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Right Panel - Communications */}
          <div className="w-1/2 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Communication History</h3>
            <ScrollArea className="h-full">
              <div className="space-y-4">
                {client.communications.length > 0 ? (
                  client.communications.map((comm) => (
                    <div key={comm.id} className={`p-4 rounded-lg ${comm.direction === 'outbound' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {comm.type.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(comm.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{comm.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No communications yet</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onAction(client, 'call')}
              className="hover:bg-blue-50 hover:border-blue-300"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button
              variant="outline"
              onClick={() => onAction(client, 'text')}
              className="hover:bg-green-50 hover:border-green-300"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Text
            </Button>
            <Button
              variant="outline"
              onClick={() => onAction(client, 'email')}
              className="hover:bg-purple-50 hover:border-purple-300"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button
              variant="outline"
              onClick={() => onAction(client, 'docRequest')}
              className="hover:bg-orange-50 hover:border-orange-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              Doc Request
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={() => onAction(client, 'present')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Target className="h-4 w-4 mr-2" />
              Present Options
            </Button>
            <Button
              onClick={() => onAction(client, 'close')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Close Deal
            </Button>
            <Button
              variant="destructive"
              onClick={() => onAction(client, 'kill')}
              className="hover:bg-red-700"
            >
              <Skull className="h-4 w-4 mr-2" />
              Kill Lead
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
