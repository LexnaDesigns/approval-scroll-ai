
interface ClientSummaryProps {
  aiSummary: string;
}

export const ClientSummary = ({ aiSummary }: ClientSummaryProps) => {
  return (
    <p className="text-gray-700 text-xs mb-2 leading-relaxed">
      {aiSummary}
    </p>
  );
};
