
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BarChart3, 
  Calendar, 
  Shield, 
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  Target,
  TrendingUp,
  Clock,
  Phone,
  DollarSign,
  FileText
} from 'lucide-react';

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect authenticated users to the main app
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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

  const testimonials = [
    {
      name: "Dave M.",
      role: "Independent Dealer, Alberta",
      content: "Finally built for guys like me. Not some massive franchise operation with unlimited IT budgets.",
      rating: 5
    },
    {
      name: "Sarah L.",  
      role: "Solo Agent, Ontario",
      content: "Perfect for building my own book of business. Doesn't assume I have a team of 20 people behind me.",
      rating: 5
    },
    {
      name: "Mike K.",
      role: "Small Lot Owner, BC", 
      content: "My 60-year-old finance guy figured it out in an afternoon. That tells you everything.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CRM</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Lot CRM</h1>
              <p className="text-xs text-gray-400">Built for Canadian auto sales</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/auth')} 
            className="bg-red-600 hover:bg-red-700 border-0"
          >
            Take a Look
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-red-900/30 text-red-200 border-red-800">
            Built by a Canadian dealer, for Canadian dealers
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Finally, a CRM That
            <span className="text-red-500"> Gets It</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            You know the drill. Another "game-changing" system that doesn't understand 
            how subprime financing actually works in Canada. This one's different. 
            Built for small lots, independent dealers, and solo agents building their own business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4 border-0"
            >
              See What's Inside
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              No Sales Pitch
            </Button>
          </div>

          {/* Reality Check */}
          <div className="bg-gray-900/50 rounded-2xl p-8 mb-16 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-red-400">Let's be honest about your current system...</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-gray-300">
                  It was designed for massive franchise operations with dedicated IT teams. 
                  You're running a 15-car lot with your cousin doing the books.
                </p>
              </div>
              <div>
                <p className="text-gray-300">
                  Half the features are for markets you'll never see, while the basics 
                  you need daily are buried in sub-menus or missing entirely.
                </p>
              </div>
              <div>
                <p className="text-gray-300">
                  You're paying enterprise prices for enterprise complexity when you just 
                  need to track leads, follow up, and close deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Revolutionary Section */}
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

      {/* Built For You */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Built For Your Reality</h2>
              <p className="text-xl text-gray-300">
                Whether you're running a small lot or building your own sales business
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium mb-1">Perfect for small operations</p>
                      <p className="text-gray-400 text-sm">5 cars or 50 cars. One salesperson or a small team. Scales with your business, not against it.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium mb-1">Solo agent friendly</p>
                      <p className="text-gray-400 text-sm">Building your own book? We get it. Track your pipeline, manage your leads, grow at your own pace.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium mb-1">Canadian subprime focus</p>
                      <p className="text-gray-400 text-sm">Understands how financing actually works here. Credit rebuilding, payment plans, and real-world solutions.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium mb-1">No enterprise nonsense</p>
                      <p className="text-gray-400 text-sm">Simple pricing. Real support. No "implementation consultants" or six-month onboarding processes.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Your Dashboard</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    The numbers you actually need, when you need them
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Active leads:</span>
                      <span className="text-white font-mono">23</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-400">This month:</span>
                      <span className="text-green-400 font-mono">$47K</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-400">Follow-ups due:</span>
                      <span className="text-red-400 font-mono">6</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-400">Hot prospects:</span>
                      <span className="text-yellow-400 font-mono">4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real People */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              From People Who Actually Use It
            </h2>
            <p className="text-xl text-gray-300">
              Real dealers, real feedback, real results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic text-sm">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/50 to-orange-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready for a CRM That Actually Works?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            No feature bloat. No enterprise complexity. Just the tools you need 
            to track leads, follow up consistently, and close more deals.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4 border-0"
          >
            See What's Inside
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            No credit card. No commitment. No sales calls. Just take a look.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CRM</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Lot CRM</h3>
                <p className="text-sm">Built for Canadian auto sales</p>
              </div>
            </div>
            <div className="text-sm">
              © 2024 Lot CRM. No corporate speak. No BS.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
