
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "FinTwin helped me understand the long-term impact of my student loans and create a realistic repayment plan. It's like having a financial advisor in my pocket.",
    name: "Alex Thompson",
    title: "Graduate Student",
    avatar: "AT"
  },
  {
    quote: "The financial twin simulator is revolutionary. I was able to test different investment strategies and see their projected outcomes before committing my money.",
    name: "Sarah Miller",
    title: "Software Engineer",
    avatar: "SM"
  },
  {
    quote: "I've learned more about personal finance in one month with FinTwin than I did in years of trying to read financial books. The personalized approach makes all the difference.",
    name: "David Chen",
    title: "Marketing Professional",
    avatar: "DC"
  },
  {
    quote: "The early warning system alerted me to a potential cash flow issue months before it would have become a problem. That alone was worth the subscription.",
    name: "Jessica Williams",
    title: "Small Business Owner",
    avatar: "JW"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg">
            Thousands of people have already transformed their financial future with FinTwin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-card h-full card-hover">
              <CardContent className="p-6">
                <div className="mb-4">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/20">
                    <path d="M13.4 36C9.4 36 6.1 34.5667 3.5 31.7C1.16667 28.6333 0 24.9333 0 20.6C0 15.8667 1.43333 11.6 4.3 7.8C7.36667 3.8 11.6667 1.13333 17.2 0L19.5 6.2C15.7 7.13333 12.7667 8.66667 10.7 10.8C8.63333 12.9333 7.6 15.2667 7.6 17.8L8.5 17.4C9.7 17.0667 11.0333 16.9 12.5 16.9C15.3667 16.9 17.8 17.9 19.8 19.9C21.8 21.7 22.8 24.1667 22.8 27.3C22.8 30.2333 21.8 32.6333 19.8 34.5C17.8 35.5 15.7333 36 13.6 36H13.4ZM35.2 36C31.2 36 27.9 34.5667 25.3 31.7C22.9667 28.6333 21.8 24.9333 21.8 20.6C21.8 15.8667 23.2333 11.6 26.1 7.8C29.1667 3.8 33.4667 1.13333 39 0L41.3 6.2C37.5 7.13333 34.5667 8.66667 32.5 10.8C30.4333 12.9333 29.4 15.2667 29.4 17.8L30.3 17.4C31.5 17.0667 32.8333 16.9 34.3 16.9C37.1667 16.9 39.6 17.9 41.6 19.9C43.6 21.7 44.6 24.1667 44.6 27.3C44.6 30.2333 43.6 32.6333 41.6 34.5C39.6 35.5 37.5333 36 35.4 36H35.2Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-lg mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={`#`} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
