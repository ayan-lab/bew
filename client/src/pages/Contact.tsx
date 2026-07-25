import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSchema } from "@/lib/contact-api";
import { useSubmitContact } from "@/hooks/use-contact";
import { MapPin, Phone, Mail, Loader2, Send, ExternalLink, Clock } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Reveal } from "@/components/Reveal";

const SERVICE_OPTIONS = [
  "Industrial Utility Engineering",
  "Plant Maintenance",
  "PEB Works",
  "Pipeline Fabrication & Erection",
  "Steel Fabrication",
  "General Enquiry",
] as const;

const formSchema = insertContactSchema.extend({
  serviceType: z.string().min(1, "Please select a service type"),
});

export default function Contact() {
  usePageMeta({
    title: "Contact Us — Get a Quote",
    description:
      "Contact Baidya Engineering Works in Chikrand, West Bengal. Call +91 987 475 1736 or request a quote for industrial utilities, PEB, pipelines, and plant maintenance.",
    path: "/contact",
  });

  const mutation = useSubmitContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      serviceType: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const messageWithService = `[Service: ${data.serviceType}]\n\n${data.message}`;
    mutation.mutate(
      {
        name: data.name,
        email: data.email,
        message: messageWithService,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-muted">
      <section className="mb-12 overflow-hidden bg-hero text-hero-foreground">
        <div className="container mx-auto px-4 py-16 text-center md:px-8">
          <Reveal y={24}>
            <h1 className="mb-4 text-4xl font-bold uppercase">Get In Touch</h1>
            <p className="mx-auto max-w-2xl text-lg text-hero-foreground/65">
              Request a quote for utilities, PEB, pipelines, or plant maintenance — or call us
              directly. We respond during business hours from Chikrand, West Bengal.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <Reveal className="grid grid-cols-1 overflow-hidden border border-border bg-card shadow-xl lg:grid-cols-2">
          <div className="relative overflow-hidden bg-hero p-10 text-hero-foreground">
            <div className="absolute -bottom-24 -right-24 h-64 w-64 bg-primary/20 blur-3xl" />

            <h2 className="mb-3 text-2xl font-bold uppercase">Contact Information</h2>
            <p className="mb-8 text-sm text-hero-foreground/65">
              Prefer WhatsApp or a quick call? Use the details below — we are happy to discuss
              feasibility before you send drawings.
            </p>

            <div className="relative z-10 space-y-8">
              <div className="flex items-start">
                <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center bg-hero-foreground/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Our Location</h3>
                  <p className="text-hero-foreground/65">
                    Chikrand
                    <br />
                    West Bengal 712304, India
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center bg-hero-foreground/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Phone Number</h3>
                  <a
                    href="tel:+919874751736"
                    className="text-hero-foreground/70 transition-colors hover:text-primary"
                  >
                    +91 987 475 1736
                  </a>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-hero-foreground/50">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    Mon–Sat: 9am – 6pm
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center bg-hero-foreground/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold">Email Address</h3>
                  <a
                    href="mailto:baidyaengineering@gmail.com"
                    className="break-all text-hero-foreground/70 transition-colors hover:text-primary"
                  >
                    baidyaengineering@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-hero-foreground/50">
                  Find us
                </h3>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Chikrand%2C+West+Bengal+712304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-hero-foreground"
                >
                  Google Maps
                  <ExternalLink className="h-3.5 w-3.5 opacity-90" aria-hidden />
                </a>
              </div>
              <div className="relative overflow-hidden border border-hero-foreground/15 bg-hero/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-primary/25">
                <div className="relative aspect-[4/3] w-full min-h-[220px] sm:min-h-[260px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14720.962111633418!2d88.25799525638959!3d22.71929962019716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8846deab6dcef%3A0xdf17d71d0f55819d!2sChikrand%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1776231221801!5m2!1sen!2sin"
                    title="Baidya Engineering Works — Chikrand, West Bengal location map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div className="p-10">
            <h2 className="mb-2 text-2xl font-bold uppercase text-foreground">
              Request a quote
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Include location, approximate scope, and any drawings or photos you can share.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-foreground/80">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="h-12 border-border bg-muted focus:border-primary focus:ring-primary/20"
                          {...field}
                        />
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
                      <FormLabel className="font-bold text-foreground/80">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          className="h-12 border-border bg-muted focus:border-primary focus:ring-primary/20"
                          {...field}
                        />
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
                      <FormLabel className="font-bold text-foreground/80">Service Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 border-border bg-muted focus:border-primary focus:ring-primary/20">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SERVICE_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-foreground/80">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project, site location, and timeline…"
                          className="min-h-[150px] resize-none border-border bg-muted focus:border-primary focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="h-12 w-full text-sm font-bold uppercase tracking-wider shadow-lg shadow-primary/20"
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
        </Reveal>
      </div>
    </div>
  );
}
