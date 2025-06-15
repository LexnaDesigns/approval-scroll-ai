
import { Client, Communication } from '@/types/client';

export interface MessageUpdate {
  clientId: string;
  communication: Communication;
  needsManagerAttention?: boolean;
  isHotLead?: boolean;
}

const clientMessages = [
  "Hey, just wondering about the status of my application?",
  "Can you tell me more about the interest rates?",
  "I have some questions about the monthly payments",
  "When will I know if I'm approved?",
  "What documents do you still need from me?",
  "Is there any way to lower the down payment?",
  "I'm really excited to get this car!",
  "My credit score just went up, does that help?",
  "Can we discuss the terms today?",
  "I found a car I really want, can we move fast?",
  "Do you have weekend hours to meet?",
  "What's the next step in the process?"
];

const aiResponses = [
  "Thanks for reaching out! Let me check on your application status and get back to you shortly.",
  "Great question! Based on your credit profile, I have several competitive rate options to discuss with you.",
  "I'd be happy to break down the payment options. When would be a good time for a quick call?",
  "Your application is progressing well! I should have an update for you within 24 hours.",
  "I'll send you a secure link to upload any remaining documents. Thanks for staying on top of this!",
  "Let me see what flexibility we have with the down payment. I'll review with my manager.",
  "That's great to hear! Your enthusiasm shows you're ready to move forward.",
  "Absolutely! An improved credit score can definitely help with better terms. Let me reassess.",
  "Perfect timing! I have some great options ready to present. Are you available this afternoon?",
  "I love the urgency! Let me prioritize your file and see how quickly we can get you approved.",
  "We're flexible with scheduling! I can meet you Saturday morning if that works better.",
  "Next up is final approval! I'm optimistic about your application."
];

const managerAlertTriggers = [
  "interest rates",
  "lower the down payment",
  "move fast",
  "weekend hours",
  "better terms"
];

export class MessageSimulator {
  private intervalId: NodeJS.Timeout | null = null;
  private onUpdate: (update: MessageUpdate) => void;
  private managerAlertsSent = 0;

  constructor(onUpdate: (update: MessageUpdate) => void) {
    this.onUpdate = onUpdate;
  }

  start(getClients: () => Client[]) {
    if (this.intervalId) return;

    // Send first message immediately after 5 seconds, then every 45 seconds
    setTimeout(() => {
      this.simulateMessage(getClients());
      
      this.intervalId = setInterval(() => {
        this.simulateMessage(getClients());
      }, 45000); // 45 seconds for demo
    }, 5000); // 5 second initial delay
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private simulateMessage(clients: Client[]) {
    // Only send messages to active leads (not Delivered or Killed)
    const activeClients = clients.filter(c => 
      c.stage !== 'Delivered' && c.stage !== 'Killed'
    );
    
    if (activeClients.length === 0) return;

    const client = activeClients[Math.floor(Math.random() * activeClients.length)];
    const message = clientMessages[Math.floor(Math.random() * clientMessages.length)];
    const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];

    // Check if this message needs manager attention
    let needsManagerAttention = managerAlertTriggers.some(trigger => 
      message.toLowerCase().includes(trigger)
    );

    if (needsManagerAttention) {
      if (this.managerAlertsSent < 2) {
        this.managerAlertsSent++;
      } else {
        needsManagerAttention = false;
      }
    }

    // Determine if this should make the lead "hot" - increased chance for testing
    const isHotLead = client.stage === 'Docs In' && Math.random() > 0.4;

    // Create incoming message
    const incomingMessage: Communication = {
      id: `msg-${Date.now()}-in`,
      type: 'text',
      content: message,
      timestamp: new Date().toISOString(),
      direction: 'inbound'
    };

    console.log(`📱 Simulating message from ${client.name}: ${message}`);
    if (needsManagerAttention) {
      console.log(`🚨 Manager alert triggered for ${client.name}`);
    }
    if (isHotLead) {
      console.log(`🔥 Hot lead generated for ${client.name}`);
    }

    this.onUpdate({
      clientId: client.id,
      communication: incomingMessage,
      needsManagerAttention,
      isHotLead
    });

    // Send AI response after a short delay
    setTimeout(() => {
      const aiMessage: Communication = {
        id: `msg-${Date.now()}-out`,
        type: 'ai',
        content: response,
        timestamp: new Date().toISOString(),
        direction: 'outbound'
      };

      console.log(`🤖 AI responding to ${client.name}: ${response}`);

      this.onUpdate({
        clientId: client.id,
        communication: aiMessage
      });
    }, 2000 + Math.random() * 3000); // 2-5 second delay
  }
}
