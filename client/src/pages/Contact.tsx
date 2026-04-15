import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { MapPin, Phone, Mail, Loader2, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = insertContactSchema;

export default function Contact() {
  const mutation = useSubmitContact();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "",
      message: ""
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header — full-bleed under fixed navbar (same pattern as Home / Services) */}
      <section className="relative min-h-[380px] flex items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000"
            alt="Contact and communication"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center pt-20 pb-20">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4">Get In Touch</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">We'd love to hear about your project.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Contact Info Side */}
          <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            
            <h2 className="text-2xl font-bold uppercase mb-8">Contact Information</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Location</h3>
                  <p className="text-slate-400">123 Industrial Area, Phase II<br />Steel City, ST 45001</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mr-4 shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                  <p className="text-slate-400">+91 987 654 3210</p>
                  <p className="text-slate-500 text-sm mt-1">Mon-Sat: 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mr-4 shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Address</h3>
                  <p className="text-slate-400">info@baidya-engineering.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 h-48 bg-slate-800 rounded opacity-50 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14720.962111633418!2d88.25799525638959!3d22.71929962019716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8846deab6dcef%3A0xdf17d71d0f55819d!2sChikrand%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1776231221801!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Baidya Engineering Map"></iframe>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10">
            <h2 className="text-2xl font-bold uppercase text-slate-900 mb-6">Send us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" className="bg-slate-50 border-slate-200 h-12 focus:border-primary focus:ring-primary/20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-slate-700">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" className="bg-slate-50 border-slate-200 h-12 focus:border-primary focus:ring-primary/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-slate-700">Service Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-50 border-slate-200 h-12 focus:border-primary focus:ring-primary/20">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Construction">Construction</SelectItem>
                            <SelectItem value="Fabrication">Metal Fabrication</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Mechanical">Mechanical Works</SelectItem>
                            <SelectItem value="Other">Other Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">Project Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your requirements..." className="min-h-[150px] bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full h-12 bg-primary hover:bg-orange-600 text-white font-bold uppercase tracking-wider text-sm shadow-lg shadow-orange-500/20"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
