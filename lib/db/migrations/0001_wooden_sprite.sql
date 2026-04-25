CREATE TYPE "public"."company_type" AS ENUM('category_1', 'category_2', 'category_3', 'category_4', 'not_applicable');--> statement-breakpoint
CREATE TYPE "public"."marital_status" AS ENUM('single', 'married', 'divorced', 'widowed');--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "nationality" varchar(64);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "arrived_at" date;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "marital_status" "marital_status";--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "has_children" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "current_job_industry" varchar(128);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "last_visa_renewal_at" date;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "company_type" "company_type";--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "recent_changes" jsonb;