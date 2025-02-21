CREATE TABLE IF NOT EXISTS "random" (
	"id" text PRIMARY KEY NOT NULL,
	"random_number" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
