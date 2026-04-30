CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"profile_picture" varchar(255),
	"rating" integer DEFAULT 0 NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "image" SET DATA TYPE varchar(255)[] USING ARRAY["image"];--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "author_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contact_submissions" DROP COLUMN "service_type";