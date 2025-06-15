
import { Client } from '@/types/client';
import { CheckCircle } from 'lucide-react';

interface ClientDocumentsProps {
  documents: Client['documents'];
  communications: Client['communications'];
}

export const ClientDocuments = ({ documents, communications }: ClientDocumentsProps) => {
  return (
    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          {documents.license ? (
            <CheckCircle className="h-3 w-3 text-green-500" />
          ) : (
            <div className="h-3 w-3 rounded-full border border-red-500" />
          )}
          <span>ID</span>
        </div>
        <div className="flex items-center space-x-1">
          {documents.income ? (
            <CheckCircle className="h-3 w-3 text-green-500" />
          ) : (
            <div className="h-3 w-3 rounded-full border border-red-500" />
          )}
          <span>Income</span>
        </div>
      </div>
      
      {communications.length > 0 && (
        <div className="flex items-center space-x-1">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Active</span>
        </div>
      )}
    </div>
  );
};
