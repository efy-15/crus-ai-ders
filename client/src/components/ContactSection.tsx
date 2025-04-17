import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSubmissionSchema, insertIdeaSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactSchema = insertContactSubmissionSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ideaSchema = insertIdeaSubmissionSchema.extend({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  impact: z.string().min(20, "Impact description must be at least 20 characters"),
  email: z.string().email("Invalid email address"),
});

type ContactFormValues = z.infer<typeof contactSchema>;
type IdeaFormValues = z.infer<typeof ideaSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isIdeaSubmitting, setIsIdeaSubmitting] = useState(false);
  
  const { 
    register: registerContact, 
    handleSubmit: handleContactSubmit, 
    reset: resetContact,
    formState: { errors: contactErrors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  const { 
    register: registerIdea, 
    handleSubmit: handleIdeaSubmit, 
    reset: resetIdea,
    formState: { errors: ideaErrors },
  } = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      impact: "",
      email: "",
    },
  });
  
  const onContactSubmit = async (data: ContactFormValues) => {
    try {
      setIsContactSubmitting(true);
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! We'll be in touch soon.",
      });
      
      resetContact();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsContactSubmitting(false);
    }
  };
  
  const onIdeaSubmit = async (data: IdeaFormValues) => {
    try {
      setIsIdeaSubmitting(true);
      await apiRequest("POST", "/api/ideas", data);
      
      toast({
        title: "Idea Submitted",
        description: "Thank you for sharing your idea! Our team will review it soon.",
      });
      
      resetIdea();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your idea. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsIdeaSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="inline-block font-orbitron text-3xl md:text-4xl font-bold relative">
            Join Our Crusade
            <span className="block h-1 w-full bg-primary mt-2"></span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto opacity-80">Have a question or want to contribute to our mission? Reach out to us or submit your ideas for collaboration.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-orbitron text-2xl font-bold mb-6">Get In Touch</h3>
            
            <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="font-orbitron text-sm">Your Name</label>
                <input 
                  id="name" 
                  className={`w-full bg-dark border ${contactErrors.name ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`} 
                  placeholder="Enter your name"
                  {...registerContact("name")}
                />
                {contactErrors.name && (
                  <p className="text-xs text-red-500 mt-1">{contactErrors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="font-orbitron text-sm">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className={`w-full bg-dark border ${contactErrors.email ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`} 
                  placeholder="Enter your email"
                  {...registerContact("email")}
                />
                {contactErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{contactErrors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="font-orbitron text-sm">Subject</label>
                <select 
                  id="subject" 
                  className={`w-full bg-dark border ${contactErrors.subject ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`}
                  {...registerContact("subject")}
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="collaboration">Collaboration Opportunity</option>
                  <option value="question">General Question</option>
                  <option value="support">Project Support</option>
                  <option value="other">Other</option>
                </select>
                {contactErrors.subject && (
                  <p className="text-xs text-red-500 mt-1">{contactErrors.subject.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="font-orbitron text-sm">Your Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className={`w-full bg-dark border ${contactErrors.message ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors resize-none`} 
                  placeholder="Enter your message"
                  {...registerContact("message")}
                ></textarea>
                {contactErrors.message && (
                  <p className="text-xs text-red-500 mt-1">{contactErrors.message.message}</p>
                )}
              </div>
              
              <button 
                type="submit" 
                className="w-full px-8 py-3 font-orbitron text-sm uppercase tracking-widest bg-primary text-background rounded hover:bg-opacity-80 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                disabled={isContactSubmitting}
              >
                <span>{isContactSubmitting ? "Sending..." : "Send Message"}</span>
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-dark rounded-lg overflow-hidden h-full">
              <div className="p-8">
                <h3 className="font-orbitron text-2xl font-bold mb-6">Submit Your Idea</h3>
                
                <form onSubmit={handleIdeaSubmit(onIdeaSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="idea-title" className="font-orbitron text-sm">Idea Title</label>
                    <input 
                      id="idea-title"
                      className={`w-full bg-highlight border ${ideaErrors.title ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`} 
                      placeholder="Title of your AI idea"
                      {...registerIdea("title")}
                    />
                    {ideaErrors.title && (
                      <p className="text-xs text-red-500 mt-1">{ideaErrors.title.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="idea-category" className="font-orbitron text-sm">Category</label>
                    <select 
                      id="idea-category" 
                      className={`w-full bg-highlight border ${ideaErrors.category ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`}
                      {...registerIdea("category")}
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="research">Research Proposal</option>
                      <option value="application">AI Application</option>
                      <option value="education">Educational Initiative</option>
                      <option value="policy">Policy Recommendation</option>
                      <option value="other">Other</option>
                    </select>
                    {ideaErrors.category && (
                      <p className="text-xs text-red-500 mt-1">{ideaErrors.category.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="idea-description" className="font-orbitron text-sm">Description</label>
                    <textarea 
                      id="idea-description" 
                      rows={5} 
                      className={`w-full bg-highlight border ${ideaErrors.description ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors resize-none`} 
                      placeholder="Describe your idea in detail"
                      {...registerIdea("description")}
                    ></textarea>
                    {ideaErrors.description && (
                      <p className="text-xs text-red-500 mt-1">{ideaErrors.description.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="idea-impact" className="font-orbitron text-sm">Potential Impact</label>
                    <textarea 
                      id="idea-impact" 
                      rows={3} 
                      className={`w-full bg-highlight border ${ideaErrors.impact ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors resize-none`} 
                      placeholder="How could this idea democratize AI?"
                      {...registerIdea("impact")}
                    ></textarea>
                    {ideaErrors.impact && (
                      <p className="text-xs text-red-500 mt-1">{ideaErrors.impact.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="idea-email" className="font-orbitron text-sm">Your Email</label>
                    <input 
                      type="email" 
                      id="idea-email" 
                      className={`w-full bg-highlight border ${ideaErrors.email ? 'border-red-500' : 'border-highlight focus:border-primary'} rounded px-4 py-3 outline-none transition-colors`} 
                      placeholder="Your email for updates on your idea"
                      {...registerIdea("email")}
                    />
                    {ideaErrors.email && (
                      <p className="text-xs text-red-500 mt-1">{ideaErrors.email.message}</p>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full px-8 py-3 font-orbitron text-sm uppercase tracking-widest bg-gradient-to-r from-secondary to-primary text-background rounded hover:bg-opacity-80 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    disabled={isIdeaSubmitting}
                  >
                    <span>{isIdeaSubmitting ? "Submitting..." : "Submit Idea"}</span>
                    <i className="fas fa-lightbulb"></i>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
