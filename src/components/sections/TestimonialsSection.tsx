
import { Star } from "lucide-react";
import { testimonials } from "@/data/landingPageData";

interface TestimonialsSectionProps {
  isVisible: boolean;
}

const TestimonialsSection = ({ isVisible }: TestimonialsSectionProps) => {
  return (
    <section 
      id="testimonials" 
      className={`py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-900 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            What Our Users Say
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Join thousands of satisfied users who've transformed their workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/10 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                  <p className="text-slate-400 text-sm">{testimonial.title}</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-slate-300 italic">"{testimonial.quote}"</p>
              </div>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-6 px-10 inline-flex flex-wrap items-center justify-center gap-12">
            <div className="flex flex-col items-center">
              <h4 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">10,000+</h4>
              <p className="text-sm text-slate-400">Active Users</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">4.9/5</h4>
              <p className="text-sm text-slate-400">User Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">1M+</h4>
              <p className="text-sm text-slate-400">Images Processed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
