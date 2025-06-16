
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
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
  );
};

export default TestimonialsSection;
