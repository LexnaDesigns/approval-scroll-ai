
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target,
  Users,
  Phone,
  Calendar,
  FileText,
  DollarSign
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Track What Actually Moves Cars",
      description: "Leads, follow-ups, and close rates. Not some fancy algorithm—just the numbers that matter when you're trying to hit your monthly target."
    },
    {
      icon: Users,
      title: "Real Customer Profiles",
      description: "Credit situations, payment history, and notes that actually help. Because remembering Mrs. Johnson's ex-husband co-signed last time matters."
    },
    {
      icon: Phone,
      title: "Follow-Up That Works",
      description: "Automated reminders that don't sound like robots. Your follow-up calls happen when they should, not when you remember."
    },
    {
      icon: Calendar,
      title: "Appointments That Show",
      description: "Scheduling that actually sends reminders. Because 'I forgot' stops being an excuse when the system does the remembering."
    },
    {
      icon: FileText,
      title: "Paperwork Made Simple",
      description: "Document tracking that doesn't require a PhD. Upload, organize, and find what you need without digging through filing cabinets."
    },
    {
      icon: DollarSign,
      title: "Commission Tracking",
      description: "Know exactly where your money is coming from. Track your deals, your pipeline, and your actual earnings—not just hopes and dreams."
    }
  ];

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Not Revolutionary. Just Right.
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not trying to "disrupt" anything. We just built the features that should 
            have been there all along—the ones you actually use to sell cars and make money.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg mb-4">
            These aren't breakthrough innovations. They're basic features that work the way you'd expect them to.
          </p>
          <p className="text-gray-300">
            Because sometimes the most revolutionary thing you can do is just make stuff work properly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
