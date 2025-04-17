import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertWorkshopRegistrationSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
    <section id="register" className="py-20 relative bg-dark">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="inline-block font-orbitron text-3xl md:text-4xl font-bold relative">
              Register for Workshops
              <span className="block h-1 w-full bg-primary mt-2"></span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto opacity-80">Join our upcoming workshops and training sessions to gain practical skills in AI development and ethical implementation.</p>
          </motion.div>
          
          <motion.div 
            className="bg-highlight rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Workshop Option 1 */}
              <div className="bg-dark rounded p-4 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-primary bg-opacity-20 text-primary rounded-full text-xs font-orbitron uppercase">Beginner</span>
                  <span className="text-xs opacity-60">3 hours</span>
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-2">AI Fundamentals</h3>
                <p className="text-sm opacity-80 flex-grow">Introduction to AI concepts and practical applications for those new to the field.</p>
                <div className="mt-4 text-right">
                  <span className="text-primary font-bold">Free</span>
                </div>
              </div>
              
              {/* Workshop Option 2 */}
              <div className="bg-dark rounded p-4 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-background text-xs px-3 py-1 font-orbitron transform rotate-45 translate-x-6 translate-y-2">
                    Popular
                  </div>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-primary bg-opacity-20 text-primary rounded-full text-xs font-orbitron uppercase">Intermediate</span>
                  <span className="text-xs opacity-60">6 hours</span>
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-2">Ethical AI Development</h3>
                <p className="text-sm opacity-80 flex-grow">Learn principles and practices for developing AI systems that are fair, transparent, and beneficial.</p>
                <div className="mt-4 text-right">
                  <span className="text-primary font-bold">$49.99</span>
                </div>
              </div>
              
              {/* Workshop Option 3 */}
              <div className="bg-dark rounded p-4 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-primary bg-opacity-20 text-primary rounded-full text-xs font-orbitron uppercase">Advanced</span>
                  <span className="text-xs opacity-60">8 hours</span>
                </div>
                <h3 className="font-orbitron text-lg font-bold mb-2">AI Implementation</h3>
                <p className="text-sm opacity-80 flex-grow">Hands-on workshop for implementing AI solutions in real-world applications and scenarios.</p>
                <div className="mt-4 text-right">
                  <span className="text-primary font-bold">$99.99</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="full-name" className="font-orbitron text-sm">Full Name</label>
                  <input 
                    id="full-name" 
                    className={`w-full bg-dark border ${errors.fullName ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`} 
                    placeholder="Enter your full name"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email-address" className="font-orbitron text-sm">Email Address</label>
                  <input 
                    type="email" 
                    id="email-address" 
                    className={`w-full bg-dark border ${errors.email ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`} 
                    placeholder="Enter your email address"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="workshop" className="font-orbitron text-sm">Select Workshop</label>
                  <select 
                    id="workshop" 
                    className={`w-full bg-dark border ${errors.workshop ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`}
                    {...register("workshop")}
                  >
                    <option value="" disabled>Choose a workshop</option>
                    <option value="fundamentals">AI Fundamentals (Free)</option>
                    <option value="ethical">Ethical AI Development ($49.99)</option>
                    <option value="implementation">AI Implementation ($99.99)</option>
                  </select>
                  {errors.workshop && (
                    <p className="text-xs text-red-500 mt-1">{errors.workshop.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="date" className="font-orbitron text-sm">Preferred Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    className={`w-full bg-dark border ${errors.preferredDate ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`}
                    {...register("preferredDate")}
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-red-500 mt-1">{errors.preferredDate.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="experience" className="font-orbitron text-sm">Your Experience Level</label>
                <select 
                  id="experience" 
                  className={`w-full bg-dark border ${errors.experienceLevel ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`}
                  {...register("experienceLevel")}
                >
                  <option value="" disabled>Select your experience level</option>
                  <option value="beginner">Beginner - New to AI</option>
                  <option value="intermediate">Intermediate - Some AI experience</option>
                  <option value="advanced">Advanced - Experienced in AI</option>
                </select>
                {errors.experienceLevel && (
                  <p className="text-xs text-red-500 mt-1">{errors.experienceLevel.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="goals" className="font-orbitron text-sm">Your Learning Goals</label>
                <textarea 
                  id="goals" 
                  rows={3} 
                  className={`w-full bg-dark border ${errors.learningGoals ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors resize-none`} 
                  placeholder="What do you hope to learn from this workshop?"
                  {...register("learningGoals")}
                ></textarea>
                {errors.learningGoals && (
                  <p className="text-xs text-red-500 mt-1">{errors.learningGoals.message}</p>
                )}
              </div>
              
              <div className="flex items-start gap-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mt-1"
                  {...register("acceptedTerms")}
                />
                <label htmlFor="terms" className="text-sm opacity-80">I agree to the terms and conditions and understand that workshop materials will be shared with me before the event.</label>
              </div>
              {errors.acceptedTerms && (
                <p className="text-xs text-red-500 mt-1">{errors.acceptedTerms.message}</p>
              )}
              
              <button 
                type="submit" 
                className="w-full px-8 py-4 font-orbitron text-sm uppercase tracking-widest bg-primary text-background rounded hover:bg-opacity-80 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Processing..." : "Register Now"}</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
