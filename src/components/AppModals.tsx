
import { Client } from '@/types/client';
import { ClientProfile } from '@/components/ClientProfile';
import { TextComposeModal } from '@/components/TextComposeModal';
import { EmailComposeModal } from '@/components/EmailComposeModal';
import { DocRequestModal } from '@/components/DocRequestModal';
import { CloseDealModal } from '@/components/CloseDealModal';
import { PresentVehicleModal } from '@/components/PresentVehicleModal';

interface AppModalsProps {
  selectedClient: Client | null;
  onCloseProfile: () => void;
  onClientAction: (client: Client, action: string) => void;
  onUpdateStage: (clientId: string, newStage: Client['stage']) => void;
  
  activeClient: Client | null;
  
  showPresentVehicleModal: boolean;
  onClosePresentVehicleModal: () => void;

  showTextModal: boolean;
  onCloseTextModal: () => void;

  showEmailModal: boolean;
  onCloseEmailModal: () => void;
  
  showDocRequestModal: boolean;
  onCloseDocRequestModal: () => void;

  showCloseDealModal: boolean;
  onCloseCloseDealModal: () => void;
  onCompleteCloseDeal: (clientId: string) => void;
}

export const AppModals = ({
  selectedClient,
  onCloseProfile,
  onClientAction,
  onUpdateStage,
  activeClient,
  showPresentVehicleModal,
  onClosePresentVehicleModal,
  showTextModal,
  onCloseTextModal,
  showEmailModal,
  onCloseEmailModal,
  showDocRequestModal,
  onCloseDocRequestModal,
  showCloseDealModal,
  onCloseCloseDealModal,
  onCompleteCloseDeal
}: AppModalsProps) => {
  return (
    <>
      {selectedClient && (
        <ClientProfile
          client={selectedClient}
          onClose={onCloseProfile}
          onAction={onClientAction}
          onUpdateStage={onUpdateStage}
        />
      )}

      {showPresentVehicleModal && activeClient && (
        <PresentVehicleModal
          client={activeClient}
          isOpen={showPresentVehicleModal}
          onClose={onClosePresentVehicleModal}
        />
      )}

      {showTextModal && activeClient && (
        <TextComposeModal
          client={activeClient}
          onClose={onCloseTextModal}
        />
      )}

      {showEmailModal && activeClient && (
        <EmailComposeModal
          client={activeClient}
          onClose={onCloseEmailModal}
        />
      )}

      {showDocRequestModal && activeClient && (
        <DocRequestModal
          client={activeClient}
          onClose={onCloseDocRequestModal}
        />
      )}

      {showCloseDealModal && activeClient && (
        <CloseDealModal
          client={activeClient}
          onClose={onCloseCloseDealModal}
          onComplete={onCompleteCloseDeal}
        />
      )}
    </>
  );
}
