import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSchema } from "@/lib/contact-api";
import { useSubmitContact } from "@/hooks/use-contact";
import { MapPin, Phone, Mail, Loader2, Send, ExternalLink } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = insertContactSchema.extend({
  serviceType: z.string().min(1, "Please select a service type"),
});

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
    const { serviceType: _serviceType, ...payload } = data;
    mutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header — full-bleed under fixed navbar (same pattern as Home / Services) */}
      <section className="bg-zinc-950 text-white mb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center pt-20 pb-16">
          <h1 className="text-4xl font-bold uppercase mb-4">Get In Touch</h1>
          <p className="text-slate-400">We'd love to hear about your project.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100">
          
          {/* Contact Info Side */}
          <div className="bg-zinc-950 p-10 text-white relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            
            <h2 className="text-2xl font-bold uppercase mb-8">Contact Information</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Location</h3>
                  <p className="text-slate-400">Chickrand<br />West Bengal 712304</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mr-4 shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                  <p className="text-slate-400">+91 987 475 1736</p>
                  <p className="text-slate-500 text-sm mt-1">Mon-Sat: 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center mr-4 shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Address</h3>
                  <p className="text-slate-400">baidya.engineering@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Find us
                </h3>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Chikrand%2C+West+Bengal+712304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-white"
                >
                  Google Maps
                  <ExternalLink className="h-3.5 w-3.5 opacity-90" aria-hidden />
                </a>
              </div>
              <div className="relative overflow-hidden rounded-lg border border-white/15 bg-zinc-900/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-primary/25">
                <div className="relative aspect-[4/3] w-full min-h-[220px] sm:min-h-[260px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14720.962111633418!2d88.25799525638959!3d22.71929962019716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8846deab6dcef%3A0xdf17d71d0f55819d!2sChikrand%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1776231221801!5m2!1sen!2sin"
                    title="Baidya Engineering — location map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10"
                  aria-hidden
                />
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700">Message</FormLabel>
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
                  className="w-full h-12 font-bold uppercase tracking-wider text-sm shadow-lg shadow-teal-900/20"
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
