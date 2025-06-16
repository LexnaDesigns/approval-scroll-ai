
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
  Clock
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
      title: "Track What Matters",
      description: "No fluff. Just the numbers that actually move cars off the lot."
    },
    {
      icon: Users,
      title: "Know Your Customers",
      description: "Real profiles. Real credit situations. Real solutions that work."
    },
    {
      icon: TrendingUp,
      title: "See the Patterns",
      description: "Which deals close. Which ones walk. Why some months hit and others don't."
    },
    {
      icon: Calendar,
      title: "Stay Organized",
      description: "Follow-ups that actually happen. Appointments that show up."
    },
    {
      icon: Clock,
      title: "Built for Speed",
      description: "Because time kills deals. Every second counts on the lot."
    },
    {
      icon: Shield,
      title: "Actually Secure",
      description: "Your customer data stays yours. No surprises in the fine print."
    }
  ];

  const testimonials = [
    {
      name: "Rick M.",
      role: "20+ years on the lot",
      content: "Finally something that gets it. No corporate BS, just tools that work when you need them to work.",
      rating: 5
    },
    {
      name: "Maria S.",  
      role: "Finance Manager",
      content: "Built by someone who's actually been in the trenches. Shows in every feature.",
      rating: 5
    },
    {
      name: "Tony K.",
      role: "Sales Manager", 
      content: "My 65-year-old salesmen can actually use this thing. That's saying something.",
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
              <p className="text-xs text-gray-400">Built by dealers, for dealers</p>
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
            Built by someone who's been there
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Stop Fighting Your
            <span className="text-red-500"> CRM</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            You know the drill. Another "revolutionary" system that doesn't understand 
            how subprime really works. This one's different. Built by someone who's 
            actually moved iron on a buy-here-pay-here lot.
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
              Not Another Demo
            </Button>
          </div>

          {/* Reality Check */}
          <div className="bg-gray-900/50 rounded-2xl p-8 mb-16 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-red-400">Let's be honest...</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <p className="text-gray-300">
                  Your current system was built by someone who's never had to explain 
                  a 28% APR to a customer with a 480 credit score.
                </p>
              </div>
              <div>
                <p className="text-gray-300">
                  Half your team can't figure out how to use it, and the other half 
                  gave up trying months ago.
                </p>
              </div>
              <div>
                <p className="text-gray-300">
                  You're paying for features you'll never use while missing the ones 
                  you actually need to close deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Actually Matters */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Actually Matters
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              No corporate jargon. No "revolutionary" features. 
              Just the tools you need to move cars and make money.
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
        </div>
      </section>

      {/* The Difference */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">The Difference</h2>
              <p className="text-xl text-gray-300">
                Built by someone who understands your world
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium mb-1">Actually understands subprime</p>
                      <p className="text-gray-400 text-sm">Built for the reality of buy-here-pay-here, not some fantasy dealership</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium mb-1">Your older staff can use it</p>
                      <p className="text-gray-400 text-sm">Real tech support from people who get that not everyone grew up with smartphones</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium mb-1">No hidden surprises</p>
                      <p className="text-gray-400 text-sm">Transparent pricing. No "premium features" locked behind another paywall</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No BS Dashboard</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    See your numbers without having to dig through 12 different reports
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Cars on lot:</span>
                      <span className="text-white font-mono">47</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-400">This month:</span>
                      <span className="text-green-400 font-mono">+$127K</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2">
                      <span className="text-gray-400">Hot leads:</span>
                      <span className="text-red-400 font-mono">8</span>
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
              From People Who Get It
            </h2>
            <p className="text-xl text-gray-300">
              No fake testimonials from stock photo models
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
            Ready to Stop Fighting Your Tools?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            No sales pitch. No 47-step demo. Just take a look and see if it makes sense 
            for your operation.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4 border-0"
          >
            Take a Look Inside
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            No credit card. No commitment. No sales calls.
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
                <p className="text-sm">Built by dealers, for dealers</p>
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
