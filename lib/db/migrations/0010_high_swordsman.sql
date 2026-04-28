CREATE TABLE "dev_login_links" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"token" varchar(64) NOT NULL,
	"email" varchar(255) NOT NULL,
	"link" text NOT NULL,
	"consumed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "dev_login_links_token_unique" ON "dev_login_links" USING btree ("token");--> statement-breakpoint
CREATE INDEX "dev_login_links_email_created_idx" ON "dev_login_links" USING btree ("email","created_at");--> statement-breakpoint
CREATE INDEX "dev_login_links_consumed_idx" ON "dev_login_links" USING btree ("consumed_at");