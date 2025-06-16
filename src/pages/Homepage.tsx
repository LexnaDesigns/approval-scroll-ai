
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
  MessageSquare, 
  Shield, 
  Zap,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect authenticated users to the main app
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Users,
      title: "Client Management",
      description: "Organize and track all your clients in one beautiful dashboard"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Get insights into your sales performance with real-time analytics"
    },
    {
      icon: Calendar,
      title: "Integrated Calendar",
      description: "Schedule meetings and track important dates seamlessly"
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Keep all client communications organized and accessible"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed with modern technology stack"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sales Manager",
      content: "This CRM transformed how we manage our client relationships. The interface is intuitive and the analytics are game-changing.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Business Owner",
      content: "Finally, a CRM that doesn't feel overwhelming. Clean, fast, and exactly what we needed.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Account Executive",
      content: "The live feed feature keeps me updated on all client activities. It's like having a personal assistant!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">CR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CRM Pro</h1>
              <p className="text-xs text-gray-500">Professional Sales Management</p>
            </div>
          </div>
          <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-blue-600 to-purple-600">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
          ✨ The Future of Client Management
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Manage Clients Like a
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Pro</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your sales process with our intuitive CRM that combines powerful analytics, 
          seamless communication, and beautiful design into one unified platform.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-8 py-4"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-4">
            Watch Demo
          </Button>
        </div>

        {/* Screenshot Preview */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="ml-4 text-sm text-gray-600">CRM Pro Dashboard</div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop" 
              alt="CRM Dashboard Preview" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Floating cards */}
          <div className="absolute -left-4 top-20 bg-white p-4 rounded-xl shadow-lg border hidden lg:block animate-bounce-gentle">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">125 Active Clients</span>
            </div>
          </div>
          
          <div className="absolute -right-4 bottom-20 bg-white p-4 rounded-xl shadow-lg border hidden lg:block animate-bounce-gentle" style={{animationDelay: '1s'}}>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">↗️ 32% Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive CRM platform provides all the tools you need to manage, 
              analyze, and grow your client relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="social-card border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See It in Action
            </h2>
            <p className="text-xl text-gray-600">
              Get a sneak peek at the beautiful interface and powerful features
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Client Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Get a complete overview of all your clients with our intuitive dashboard. 
                Track activities, monitor progress, and stay on top of every opportunity.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Real-time client activity feed</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Smart filtering and search</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Interactive client profiles</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" 
                alt="Analytics Dashboard" 
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
            <div className="bg-white rounded-2xl shadow-xl border overflow-hidden lg:order-first">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
                alt="Client Management" 
                className="w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Analytics & Insights
              </h3>
              <p className="text-gray-600 mb-6">
                Make data-driven decisions with comprehensive analytics. Track your 
                performance, identify trends, and optimize your sales process.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Revenue tracking and forecasting</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Client acquisition metrics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>Performance benchmarks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Sales Teams
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of professionals who've transformed their sales process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="social-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Sales?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of sales professionals who've already upgraded their CRM experience. 
            Start your free trial today - no credit card required.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CR</span>
              </div>
              <div>
                <h3 className="font-bold">CRM Pro</h3>
                <p className="text-sm text-gray-400">Professional Sales Management</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2024 CRM Pro. Built with ❤️ for sales teams.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
