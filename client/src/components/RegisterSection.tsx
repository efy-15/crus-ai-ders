import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertWorkshopRegistrationSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import NeuralBackground from "./NeuralBackground";

const workshopSchema = insertWorkshopRegistrationSchema.extend({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  workshop: z.string().min(1, "Please select a workshop"),
  preferredDate: z.string().min(1, "Please select a date"),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  learningGoals: z.string().min(10, "Please provide at least 10 characters about your learning goals"),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type WorkshopFormValues = z.infer<typeof workshopSchema>;

export default function RegisterSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors },
  } = useForm<WorkshopFormValues>({
    resolver: zodResolver(workshopSchema),
    defaultValues: {
      fullName: "",
      email: "",
      workshop: "",
      preferredDate: "",
      experienceLevel: "",
      learningGoals: "",
      acceptedTerms: false,
    },
  });
  
  const onSubmit = async (data: WorkshopFormValues) => {
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/workshops/register", data);
      
      toast({
        title: "Registration Complete",
        description: "Thank you for registering for our workshop! You will receive a confirmation email soon.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem with your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-24 relative overflow-hidden bg-[#020B18]">
      {/* Neural Network Background with a unique color */}
      <NeuralBackground opacity={0.75} color="#6A5ACD" particleDensity={14} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="inline-block font-orbitron text-3xl md:text-5xl font-bold relative">
              Register for Workshops
              <span className="block h-1 w-full bg-primary mt-3 rounded-full glow-effect"></span>
            </h2>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-gray-300/90">
              Join our upcoming workshops and training sessions to gain practical skills in AI development and ethical implementation.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-[#031835]/60 backdrop-blur-sm border border-[#0A4080]/70 rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Workshop Option 1 */}
              <div className="bg-[#031835]/80 border border-[#0A4080]/50 rounded-lg p-5 flex flex-col h-full transform hover:translate-y-[-5px] transition-transform duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-[#0047AB]/20 border border-[#0A6EFF]/30 text-[#00F5FF] rounded-md text-xs font-orbitron uppercase">Beginner</span>
                  <span className="text-xs text-gray-400">3 hours</span>
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-2 text-white">AI Fundamentals</h3>
                <p className="text-sm text-gray-300/80 flex-grow">Introduction to AI concepts and practical applications for those new to the field.</p>
                <div className="mt-4 text-right">
                  <span className="text-[#00F5FF] font-bold">Free</span>
                </div>
              </div>
              
              {/* Workshop Option 2 */}
              <div className="bg-[#031835]/80 border border-[#0A4080]/50 rounded-lg p-5 flex flex-col h-full relative overflow-hidden transform hover:translate-y-[-5px] transition-transform duration-300">
                <div className="absolute top-0 right-0">
                  <div className="bg-[#00F5FF] text-[#031835] text-xs px-3 py-1 font-orbitron transform rotate-45 translate-x-6 translate-y-2 shadow-glow">
                    Popular
                  </div>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-[#0047AB]/20 border border-[#0A6EFF]/30 text-[#00F5FF] rounded-md text-xs font-orbitron uppercase">Intermediate</span>
                  <span className="text-xs text-gray-400">6 hours</span>
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-2 text-white">Ethical AI Development</h3>
                <p className="text-sm text-gray-300/80 flex-grow">Learn principles and practices for developing AI systems that are fair, transparent, and beneficial.</p>
                <div className="mt-4 text-right">
                  <span className="text-[#00F5FF] font-bold">$49.99</span>
                </div>
              </div>
              
              {/* Workshop Option 3 */}
              <div className="bg-[#031835]/80 border border-[#0A4080]/50 rounded-lg p-5 flex flex-col h-full transform hover:translate-y-[-5px] transition-transform duration-300">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-[#0047AB]/20 border border-[#0A6EFF]/30 text-[#00F5FF] rounded-md text-xs font-orbitron uppercase">Advanced</span>
                  <span className="text-xs text-gray-400">8 hours</span>
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-2 text-white">AI Implementation</h3>
                <p className="text-sm text-gray-300/80 flex-grow">Hands-on workshop for implementing AI solutions in real-world applications and scenarios.</p>
                <div className="mt-4 text-right">
                  <span className="text-[#00F5FF] font-bold">$99.99</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="full-name" className="font-orbitron text-sm text-gray-300">Full Name</label>
                  <input 
                    id="full-name" 
                    className={`w-full bg-[#052553]/60 border ${errors.fullName ? 'border-red-500' : 'border-[#0A4080] focus:border-[#00F5FF]'} rounded-md px-4 py-3 outline-none transition-colors text-white`} 
                    placeholder="Enter your full name"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email-address" className="font-orbitron text-sm text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    id="email-address" 
                    className={`w-full bg-[#052553]/60 border ${errors.email ? 'border-red-500' : 'border-[#0A4080] focus:border-[#00F5FF]'} rounded-md px-4 py-3 outline-none transition-colors text-white`} 
                    placeholder="Enter your email address"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="workshop" className="font-orbitron text-sm text-gray-300">Select Workshop</label>
                  <select 
                    id="workshop" 
                    className={`w-full bg-[#052553]/60 border ${errors.workshop ? 'border-red-500' : 'border-[#0A4080] focus:border-[#00F5FF]'} rounded-md px-4 py-3 outline-none transition-colors text-white`}
                    {...register("workshop")}
                  >
                    <option value="" disabled>Choose a workshop</option>
                    <option value="fundamentals">AI Fundamentals (Free)</option>
                    <option value="ethical">Ethical AI Development ($49.99)</option>
                    <option value="implementation">AI Implementation ($99.99)</option>
                  </select>
                  {errors.workshop && (
                    <p className="text-xs text-red-400 mt-1">{errors.workshop.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="date" className="font-orbitron text-sm text-gray-300">Preferred Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    className={`w-full bg-[#052553]/60 border ${errors.preferredDate ? 'border-red-500' : 'border-[#0A4080] focus:border-[#00F5FF]'} rounded-md px-4 py-3 outline-none transition-colors text-white`}
                    {...register("preferredDate")}
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-red-400 mt-1">{errors.preferredDate.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="experience" className="font-orbitron text-sm text-gray-300">Your Experience Level</label>
                <select 
                  id="experience" 
                  className={`w-full bg-[#052553]/60 border ${errors.experienceLevel ? 'border-red-500' : 'border-[#0A4080] focus:border-[#00F5FF]'} rounded-md px-4 py-3 outline-none transition-colors text-white`}
                  {...register("experienceLevel")}
                >
                  <option value="" disabled>Select your experience level</option>
                  <option value="beginner">Beginner - New to AI</option>
                  <option value="intermediate">Intermediate - Some AI experience</option>
                  <option value="advanced">Advanced - Experienced in AI</option>
                </select>
                {errors.experienceLevel && (
                  <p className="text-xs text-red-400 mt-1">{errors.experienceLevel.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="goals" className="font-orbitron text-sm text-gray-300">Your Learning Goals</label>
                <textarea 
                  id="goals" 
                  rows={3} 
                  className={`w-full bg-[#052553]/60 border ${errors.learningGoals ? 'border-red-500' : 'border-[#0A4080] focus:border-[#00F5FF]'} rounded-md px-4 py-3 outline-none transition-colors resize-none text-white`} 
                  placeholder="What do you hope to learn from this workshop?"
                  {...register("learningGoals")}
                ></textarea>
                {errors.learningGoals && (
                  <p className="text-xs text-red-400 mt-1">{errors.learningGoals.message}</p>
                )}
              </div>
              
              <div className="flex items-start gap-3 mt-4">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1 h-4 w-4 rounded border-[#0A4080] text-[#00F5FF] bg-[#052553]/60"
                  {...register("acceptedTerms")}
                />
                <label htmlFor="terms" className="text-sm text-gray-300/90">I agree to the terms and conditions and understand that workshop materials will be shared with me before the event.</label>
              </div>
              {errors.acceptedTerms && (
                <p className="text-xs text-red-400 mt-1">{errors.acceptedTerms.message}</p>
              )}
              
              <button 
                type="submit" 
                className="w-full mt-4 px-8 py-4 font-orbitron text-sm uppercase tracking-widest bg-gradient-to-r from-[#1E90FF] to-[#00F5FF] text-[#031835] rounded-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-glow"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Processing..." : "Register Now"}</span>
                <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
