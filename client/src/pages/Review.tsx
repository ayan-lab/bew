import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profilePicture: z.string().min(1, "Profile picture is required"),
  rating: z.number().min(1, "Rating is required"),
  comment: z.string().min(1, "Comment is required"),
});

export const Review = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      profilePicture: "",
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className="flex items-center gap-1 pt-1"
                    role="group"
                    aria-label={`Rating: ${field.value} out of 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starValue = i + 1;
                      const filled = starValue <= (field.value ?? 0);
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => field.onChange(starValue)}
                          className="rounded-sm p-0.5 text-slate-300 transition hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
                        >
                          <Star
                            className={cn(
                              "h-8 w-8",
                              filled && "fill-amber-400 text-amber-400",
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={() => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={() => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePicture"
            render={() => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
