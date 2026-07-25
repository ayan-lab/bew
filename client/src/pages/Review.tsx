import { useEffect, useRef, useState } from "react";
import { Loader2, Star, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useRoute } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSubmitReview } from "@/hooks/use-submit-review";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profilePicture: z
    .custom<File | undefined>((val) => val === undefined || val instanceof File)
    .refine(
      (val) => val === undefined || (val instanceof File && val.size > 0),
      { message: "If you choose a photo, it must not be empty." },
    ),
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().min(1, "Comment is required"),
});

type ReviewFormValues = z.input<typeof formSchema>;

export const Review = () => {
  const [, routeParams] = useRoute("/review/create_review/:projectId");
  const projectIdParam = routeParams?.projectId;
  const numericProjectId = projectIdParam ? Number.parseInt(projectIdParam, 10) : NaN;
  const hasValidProjectId = Boolean(projectIdParam) && !Number.isNaN(numericProjectId);

  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const submitReview = useSubmitReview();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      profilePicture: undefined,
      rating: 0,
      comment: "",
    },
  });

  const profileFile = form.watch("profilePicture");

  useEffect(() => {
    if (!(profileFile instanceof File)) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(profileFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [profileFile]);

  const onSubmit = (data: ReviewFormValues) => {
    if (!hasValidProjectId) return;

    const profilePicture =
      data.profilePicture instanceof File && data.profilePicture.size > 0
        ? data.profilePicture
        : undefined;

    submitReview.mutate(
      {
        projectId: numericProjectId,
        firstName: data.firstName,
        lastName: data.lastName,
        rating: data.rating,
        comment: data.comment,
        profilePicture,
      },
      {
        onSuccess: () => {
          toast({
            title: "Request received",
            description: "Your review request has been saved. We'll follow up when it's processed.",
            variant: "default",
            className: "bg-primary text-primary-foreground border-none",
          });
          form.reset({
            firstName: "",
            lastName: "",
            profilePicture: undefined,
            rating: 0,
            comment: "",
          });
          if (fileInputRef.current) fileInputRef.current.value = "";
          setLocation(`/projects/${numericProjectId}`);
        },
        onError: (error: Error) => {
          toast({
            title: "Submission failed",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const isSubmitting = submitReview.isPending;

  return (
    <div className="bg-muted min-h-screen">
      <section className="bg-hero text-hero-foreground mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.35),transparent_55%)]" />
        <div className="container mx-auto px-4 text-center py-14 relative z-10">
          <h1 className="text-4xl font-bold uppercase mb-2 tracking-tight">Leave a review</h1>
          <p className="text-hero-foreground/65 max-w-xl mx-auto">
            Share your experience with this project. Your feedback helps others understand our work.
          </p>
          {projectIdParam ? (
            <p className="text-muted-foreground text-sm mt-4">
              <Link href={`/projects/${projectIdParam}`} className="text-primary hover:underline">
                View project
              </Link>
            </p>
          ) : null}
          {!hasValidProjectId ? (
            <p className="text-amber-400/90 text-sm mt-4 max-w-md mx-auto">
              This link is missing a valid project. Open a project from the portfolio and use its review link.
            </p>
          ) : null}
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 max-w-2xl">
        <Card className="border-border shadow-lg overflow-hidden">
          <CardHeader className="border-b border-border bg-card">
            <CardTitle className="text-xl uppercase text-foreground">Review details</CardTitle>
            <CardDescription>
              Optional profile photo and required fields below. Leave the photo empty if you prefer.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 bg-card">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-foreground/80">First name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First name"
                            disabled={isSubmitting}
                            className="h-11 bg-muted border-border focus-visible:ring-primary/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-foreground/80">Last name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Last name"
                            disabled={isSubmitting}
                            className="h-11 bg-muted border-border focus-visible:ring-primary/30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field: { value: _value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground/80">
                        Profile picture <span className="font-normal text-muted-foreground">(optional)</span>
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-3">
                          <label
                            className={cn(
                              "flex flex-col items-center justify-center gap-2  border-2 border-dashed border-border bg-muted px-6 py-8 text-center transition-colors",
                              !isSubmitting && "hover:border-primary/40 hover:bg-muted/80 cursor-pointer",
                              isSubmitting && "opacity-60 pointer-events-none",
                            )}
                          >
                            <Upload className="h-8 w-8 text-hero-foreground/65" aria-hidden />
                            <span className="text-sm text-muted-foreground">
                              Click to upload{" "}
                              <span className="font-medium text-foreground">JPEG, PNG, WebP, or GIF</span>
                              <span className="block text-xs text-muted-foreground mt-1">Optional · max 5 MB</span>
                            </span>
                            <Input
                              {...field}
                              ref={(el) => {
                                field.ref(el);
                                fileInputRef.current = el;
                              }}
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/gif"
                              disabled={isSubmitting}
                              className="sr-only"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                onChange(file ?? undefined);
                              }}
                              value={undefined}
                            />
                          </label>
                          {previewUrl ? (
                            <div className="flex items-center gap-4 border border-border bg-card p-3">
                              <img
                                src={previewUrl}
                                alt="Profile preview"
                                className="h-16 w-16 object-cover border border-border"
                              />
                              <p className="text-sm text-muted-foreground truncate">
                                {profileFile instanceof File ? profileFile.name : ""}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground/80">Your rating</FormLabel>
                      <FormControl>
                        <div
                          className="flex flex-col gap-2"
                          role="group"
                          aria-label={`Rating: ${field.value || 0} out of 5`}
                        >
                          <div className="flex items-center gap-1 flex-wrap">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const starValue = i + 1;
                              const filled = starValue <= (field.value ?? 0);
                              return (
                                <button
                                  key={starValue}
                                  type="button"
                                  disabled={isSubmitting}
                                  onClick={() => field.onChange(starValue)}
                                  className={cn(
                                    " p-1 text-muted-foreground transition-colors",
                                    "hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                    "disabled:pointer-events-none disabled:opacity-50",
                                    filled && "text-amber-400",
                                  )}
                                  aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
                                >
                                  <Star
                                    className={cn(
                                      "h-9 w-9 sm:h-10 sm:w-10",
                                      filled && "fill-amber-400 text-amber-400",
                                    )}
                                  />
                                </button>
                              );
                            })}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {(field.value ?? 0) > 0
                              ? `${field.value} out of 5 stars`
                              : "Select 1–5 stars."}
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground/80">Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your experience with this project…"
                          rows={5}
                          disabled={isSubmitting}
                          className="resize-y min-h-[120px] bg-muted border-border focus-visible:ring-primary/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="sm:w-auto"
                    disabled={isSubmitting}
                    onClick={() =>
                      hasValidProjectId
                        ? setLocation(`/projects/${numericProjectId}`)
                        : setLocation("/projects")
                    }
                  >
                    {hasValidProjectId ? "Cancel" : "Back to portfolio"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !hasValidProjectId}
                    className="sm:w-auto uppercase font-bold tracking-wide bg-primary hover:bg-primary/90 inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Submitting…
                      </>
                    ) : (
                      "Submit review"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
